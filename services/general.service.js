
const all_helper = require("../helpers/general.helper");
const db_helper = require("../helpers/db.helper");
const insertUserService = async (username) => {
    let result = await db_helper.insertUserData(username);
    return result;
}
const insertExerciseService = async (_id, description, duration, date) => {
    let result = await db_helper.insertExerciseData(_id, description, duration, date);
    return result;
}
const getAllExerciseService = async (_id) => {
    let result = await db_helper.getFormattedExercises(_id);
    return result;
}
const getAllUserService = async () => {
    let result = await db_helper.get_all_user();
    return result;
}
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
    insertExerciseService,
    getAllUserService,
    insertUserService,
    postShortUrlService,
    findRedirectUrlService,
    getAllExerciseService
}