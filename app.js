const express = require('express');
const ejs = require('ejs');
const fetch = require('node-fetch');

const app = express();

// static files in public folder
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const fetchQuote = await getQuote();
  res.render('index', {
    quote: fetchQuote.quote,
    author: fetchQuote.author,
    image: Math.floor(Math.random() * 7) + 1
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

async function getQuote() {
  try {
    const response = await fetch('https://api.themotivate365.com/stoic-quote', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

