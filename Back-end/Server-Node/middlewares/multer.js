//Middleware que nos permitirá configurar donde se guardará la imagen subida 

import multer from "multer";

const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage,
    dest:'images'
}).single('file');