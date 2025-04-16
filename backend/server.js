const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, '../data/recipes.json');

app.post('/api/recipes', (req, res) => {
  const newRecipe = req.body;
  let currentData = [];

  try {
    currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.log('Creating new file');
  }

  currentData.unshift(newRecipe);
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
  res.json({ message: 'Recipe saved' });
});

app.get('/api/recipes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
