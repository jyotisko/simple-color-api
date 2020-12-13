const express = require('express');

const generateRandomColor = amount => {
  const colors = [];
  const availableColor = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  for (let i = 1; i <= amount; i++) {
    const color = `#${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}`;
    colors.push({ 'color': color })
  }
  return colors;
};

const getColorsForAPI = count => {
  const colors = generateRandomColor(count);
  return colors;
};

const app = express();

app.get('/api/v1/random', (req, res) => {
  const colors = getColorsForAPI(100);
  res.status(200).json({ message: 'success', count: 100, colors: colors });
});

app.get('/api/v1/random/:count', (req, res) => {
  const count = +req.params.count;
  const colors = getColorsForAPI(count);
  res.status(200).json({ message: 'success', count: count, colors: colors });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
