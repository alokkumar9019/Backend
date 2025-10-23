import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';
import { generateWithOllama } from './clients/ollama.js';
import { rewriteWithGemini } from './clients/gemini.js';
import { htmlFromRecipe, recipeHtmlToPdf } from './pdf.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

const DATA_DIR = path.resolve(process.cwd(), 'data');
fs.ensureDirSync(DATA_DIR);
const HISTORY_FILE = path.join(DATA_DIR, 'recipes.json');
if (!fs.existsSync(HISTORY_FILE)) fs.writeJSONSync(HISTORY_FILE, []);

function saveToHistory(recipeObj) {
  const arr = fs.readJSONSync(HISTORY_FILE);
  arr.unshift({ ...recipeObj, createdAt: new Date().toISOString() });
  fs.writeJSONSync(HISTORY_FILE, arr.slice(0, 50));
}

app.post('/generate-recipe', async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'ingredients must be a non-empty array' });
    }

    const ollamaOutput = await generateWithOllama(ingredients);
    const geminiOutput = await rewriteWithGemini(ollamaOutput.steps);

    const recipe = {
      title: ollamaOutput.title,
      ingredients: ollamaOutput.ingredients,
      steps: geminiOutput.steps,
      nutrition: geminiOutput.nutrition || 'N/A'
    };

    saveToHistory(recipe);

    const html = htmlFromRecipe(recipe);
    const pdfPath = path.join(DATA_DIR, `${recipe.title.replace(/\s+/g, '_')}.pdf`);
    await recipeHtmlToPdf(html, pdfPath);

    res.json({ message: 'Recipe generated successfully', recipe, pdfPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/history', (req, res) => {
  const history = fs.readJSONSync(HISTORY_FILE);
  res.json(history);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));