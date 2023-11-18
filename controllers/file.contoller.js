const fileInof = (req, res) => {
    console.log(req.file);
    const fileInfo = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    };

    res.json(fileInfo);
}
module.exports = {
    fileInof
}