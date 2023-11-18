const fileInof = (req, res) => {
    console.log(req.upfile);
    const fileInfo = {
        name: req.upfile.originalname,
        type: req.upfile.mimetype,
        size: req.upfile.size
    };

    res.json(fileInfo);
}
module.exports = {
    fileInof
}