let Url = require("../Models/Url");
let User = require("../Models/User");
let Exercise = require("../Models/Exercise");

const get_all_user = async () => {
try {
    const all_user = await User.find().select('_id username').lean().exec();
    return all_user;
} catch (error) {
    console.log(error);
    return null;
}
}
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
async function getFormattedExercises(_id, from, to, limit) {
    try {
        console.log({ _id, from, to, limit })
        const user = await User.findOne({ _id });

        if (!user) {
            console.log('User not found');
            return null;
        }
        let returnObj = {};
        returnObj._id = user._id;
        returnObj.username = user.username;
        let query = { user: _id };
        if (from ) {
            returnObj.from = new Date(from).toDateString();
            query.date = { ...query.date, $gte: new Date(from) };
        }
        if (to) {
            returnObj.to = new Date(to).toDateString();
            query.date = { ...query.date, $lte: new Date(to) };
        }
        let exerciseQuery = Exercise.find(query);
        if (limit) {
            exerciseQuery = exerciseQuery.limit(parseInt(limit));
        }
        console.log("qqq: ", query)
        let exercises = await exerciseQuery.exec();
        if (exercises.length===0) {
            exercises = [];
        }

        // Assuming 'exercises' contains the array of Exercise documents
        const formattedExercises = exercises.map(exercise => ({
            date: exercise.date.toDateString(), // Format date as needed
            duration: exercise.duration,
            description: exercise.description
        }));
        return {...returnObj,count:formattedExercises.length,logs:formattedExercises};
    } catch (error) {
        console.error(error);
        return [];
    }
}
const insertExerciseData = async (_id, description, duration, date) => {
    try {
        const user = await User.findOne({ _id });

        if (!user) {
            console.log('User not found');
            return null;
        }
        let returnObj = {};
        returnObj._id = user._id;
        returnObj.username = user.username;
        console.log("user: ", user);
        const newExercise = new Exercise({
            user: user._id,
            description: description,
            duration: duration,
            date: date?new Date(date):new Date()
        });

        const savedExercise = await newExercise.save();
        console.log("sE: ", savedExercise);
        returnObj.description = savedExercise.description;
        returnObj.duration = savedExercise.duration;
        returnObj.date = new Date(savedExercise.date).toDateString();
        return returnObj;
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
    getFormattedExercises,
    insertExerciseData,
    save_url,
    get_url_query,
    insertUserData,
    get_all_user
}