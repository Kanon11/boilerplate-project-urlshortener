let Url = require("../Models/Url");

const postShortUrlService = (url) => {
    let response={}
    if (!!!url) {
        response.message = 'url is required';
    }
    response.original_url = url;
    response.short_url = url;
    return response;
}
module.exports = {
    postShortUrlService
}