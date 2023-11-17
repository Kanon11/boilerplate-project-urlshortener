let Url = require("../Models/Url");

const save_url = async (url, short_url) => {
    try {
        if (url.endsWith('/')) {
            url= url.slice(0, -1); 
        }
        console.log("url: ", url);
        const existingUrl = await Url.findOne({ url });

        if (!existingUrl) {
            const newUrl = await Url.create({ url, short_url: short_url });
            return newUrl; 
        } else {
            return existingUrl; 
        }
    } catch (error) {
        console.error(error);
        return null; 
    }
}
const get_url_query = async (short_url) => {
    try {
        let obj = await Url.findOne({ short_url })
        return obj;
    } catch (error) {
        console.error(error);
        return null; 
    }
}

module.exports = {
    save_url,
    get_url_query
}