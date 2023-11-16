require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// parse Url-encoded bodies (html forms)
app.use(bodyParser.urlencoded({ extended: false }));

// parse json bodies (Api requst)
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.use('/api/shorturl', function (req, res) {
  let { url } = req.body;
  res.json({ original_url: url, short_url: url });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
