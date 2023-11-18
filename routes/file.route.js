let file_controller = require('../controllers/file.contoller');
const multer = require('multer');
const path = require('path');
let pp = path.join(__dirname, '/../public/uploads')
console.log("pp: ", pp)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be stored
        cb(null, pp); // Adjust the destination folder as needed
    },
    filename: function (req, file, cb) {
        // Set the filename to be unique or maintain the original filename
        cb(null, file.originalname); // Maintain original filename; you can modify this as per your requirements
    }
});
const upload = multer({ storage: storage })

console.log("uplaod: ", upload);

const router = (app) => {
    app.post("/api/fileanalyse", upload.single('file'),file_controller.fileInof )
}
module.exports = router;