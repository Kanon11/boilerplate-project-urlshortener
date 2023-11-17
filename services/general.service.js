
const all_helper = require("../helpers/general.helper");
const db_helper = require("../helpers/db.helper");

const postShortUrlService = async (url) => {
    let response={}
    let isValid = all_helper.isValidUrl(url);
    if (!isValid|| !!!url) {
        response.error = 'invalid url';
        return response;
    }
    let short_url = all_helper.generateShortId();
    let saving_respons = await db_helper.save_url(url, short_url);
    if (saving_respons) {
        response.original_url = saving_respons.url;
        response.short_url = saving_respons.short_url
      
    }
    return response;

    
}
const findRedirectUrlService = async (short_url) => {
    let response = await db_helper.get_url_query(short_url);
    return response;
}
module.exports = {
    postShortUrlService,
    findRedirectUrlService
}