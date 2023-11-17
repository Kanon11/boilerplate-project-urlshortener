require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const services = require("./services/general.service");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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
app.post('/api/shorturl', async function (req, res) {
  let { url } = req.body;
  let response = await services.postShortUrlService(url)
  res.json(response);
});
app.get('/api/shorturl/:short_url?', async(req, res) => {
  let { short_url } = req.params;
  let redirect_url_obj = await services.findRedirectUrlService(short_url);
  console.log("obj: ", redirect_url_obj);
  if (redirect_url_obj) {
    res.redirect(redirect_url_obj.url);
  }
  else {
    res.send("Not found");
  }

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
