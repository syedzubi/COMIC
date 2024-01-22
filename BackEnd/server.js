const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const fetch = require('node-fetch');

app.get('/xkcd/latest', async (req, res) => {
  const response = await fetch('https://xkcd.com/info.0.json');
  const data = await response.json();
  res.send(data);
});

app.get('/xkcd/:comicNumber', async (req, res) => {
  const comicNumber = req.params.comicNumber;
  const response = await fetch(`https://xkcd.com/${comicNumber}/info.0.json`);
  const data = await response.json();
  res.send(data);
});