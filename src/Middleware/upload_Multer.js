const multer = require('multer')
const path = require("path")

const storage = multer.memoryStorage()
 
const upload = multer({ 
    storage:storage,
    limits:{fileSize:10*1024*1024},
    fileFilter: (req, file, cb) => {
        const allowedTypes =["image/jpeg","image/png", "application/pdf" ,"image/jpg"]
        const allowedExt = [".jpeg" , ".png" , ".pdf" , ".jpg"]

        let ext = path.extname(file.originalname).toLowerCase()

        if (allowedTypes.includes(file.mimetype) && allowedExt.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("File type  or extention not allowed"));
            }  
    } 
});

module.exports = upload;