import multer from "multer";
// import upload from '../middlewares/multer.js';

const storage=multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})
const upload=multer({storage})

export default upload