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
module.exports = {
    insertUserController,
    home
}