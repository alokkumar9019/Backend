import puppeteer from 'puppeteer';

export function htmlFromRecipe(recipe) {
  const ingList = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
  const stepsList = recipe.steps.map((s, i) => `<li><b>Step ${i+1}:</b> ${s}</li>`).join('');

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset='UTF-8'/>
    <style>
      body { font-family: Arial; margin: 40px; color: #333; }
      h1 { color: #d35400; }
      ul { line-height: 1.6; }
    </style>
  </head>
  <body>
    <h1>${recipe.title}</h1>
    <h2>Ingredients</h2><ul>${ingList}</ul>
    <h2>Steps</h2><ol>${stepsList}</ol>
    <h3>Nutrition</h3><p>${recipe.nutrition}</p>
  </body></html>`;
}

export async function recipeHtmlToPdf(html, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}