import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function generateWithOllama(ingredients) {
  const prompt = `Create a creative recipe using these ingredients: ${ingredients.join(', ')}.
Return JSON format with keys: title, ingredients (with quantities), and steps (at least 5).`;

  const res = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.OLLAMA_MODEL, prompt })
  });

  const data = await res.json();
  return JSON.parse(data.response || '{}');
}