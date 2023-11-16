const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
  url:  {
        type: String,
        required:true
    },
    short_url: {
        type: String,
        required:true
    }
})

let Url = mongoose.model('Url', UrlSchema);
module.exports = Url;