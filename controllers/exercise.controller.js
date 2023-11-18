const path = require('path');
const all_services = require('../services/general.service');

let home = (req, res) => {
    res.sendFile(path.join(__dirname, '/../views/index.html'))
}
let insertUserController = async(req, res) => {
    let { username } = req.body;
    let result=await all_services.insertUserService(username)
    return res.json(result);
}
let getAllUserController = async (req, res) => {
    let result = await all_services.getAllUserService();
    return res.json(result);
}
let insertUserExerciseController = async (req, res) => {
    let { _id } = req.params;
    let { description, duration, date } = req.body;
    console.log(req.body)
    let result = await all_services.insertExerciseService(_id,description,duration,date);
    return res.json(result);
}
let getAllExercise = async (req, res) => {
    let { _id } = req.params;
    let { from, to, limit } = req.query;
    let result = await all_services.getAllExerciseService(_id,from,to,limit);
    return res.json(result);
}
module.exports = {
    getAllExercise,
    insertUserExerciseController,
    getAllUserController,
    insertUserController,
    home
}