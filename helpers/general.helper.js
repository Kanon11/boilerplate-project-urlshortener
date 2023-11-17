function generateShortId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters[randomIndex];
    }

    return shortId;
}

const isValidUrl = (url) => {
    // Regular expression for a basic URL format
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    return urlRegex.test(url);
};

module.exports = {
    generateShortId,
    isValidUrl
}