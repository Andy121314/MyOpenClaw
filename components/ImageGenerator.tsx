'use client';

import { useState } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      if (data.image) {
        setImage(data.image);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI 图片生成器</h1>
      
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="输入描述词..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generateImage}
        disabled={loading}
      >
        {loading ? '生成中...' : '生成图片'}
      </button>
      
      {image && (
        <div className="mt-4">
          <img src={image} alt="Generated" className="max-w-full rounded" />
        </div>
      )}
    </div>
  );
}
