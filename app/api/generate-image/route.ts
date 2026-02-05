import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    const hf = new InferenceClient(process.env.HF_TOKEN);
    
    const image = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
    });
    
    // 返回 base64 图片
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = `data:image/png;base64,${buffer.toString('base64')}`;
    
    return NextResponse.json({ image: base64 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
