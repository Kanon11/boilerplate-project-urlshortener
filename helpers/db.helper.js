let Url = require("../Models/Url");
let User = require("../Models/User");
let Exercise = require("../Models/Exercise");

const insertUserData = async (name) => {
    try {
        const existingUser = await User.findOne({ username: name });
        if (!existingUser) {
            const newUser = new User({
                username: name
            });

            const savedUser = await newUser.save();
            return savedUser;
        } else {
            return existingUser
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}
const insertExerciseData = async (_id,) => {
    try {
        const user = await User.findOne({ _id,description,duration,date });

        if (!user) {
            console.log('User not found');
            return null;
        }

        const newExercise = new Exercise({
            user: user._id,
            description: description,
            duration: duration,
            date: new Date(date)
        });

        const savedExercise = await newExercise.save();
        return savedExercise;
    } catch (error) {
        console.error(error);
        return null;
    }
};
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
    insertExerciseData,
    save_url,
    get_url_query,
    insertUserData
}