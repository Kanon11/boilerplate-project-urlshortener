require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// parse Url-encoded bodies (html forms)
app.use(bodyParser.urlencoded({ extended: false }));
// parse json bodies (Api requst)
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('public'))
let exercise_rout = require('./routes/exercise.route');
exercise_rout(app);

// Basic Configuration
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
