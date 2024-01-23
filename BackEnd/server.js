const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch');

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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