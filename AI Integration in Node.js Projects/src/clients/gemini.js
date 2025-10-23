import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function rewriteWithGemini(steps) {
  const prompt = `Rewrite these cooking steps to be clear, friendly, and numbered.
Also estimate nutrition info (calories, protein, fat, carbs). Steps: ${steps.join(' ')}`;

  const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    contents: [{ parts: [{ text: prompt }] }]
  }, {
    headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
  });

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(text);
}