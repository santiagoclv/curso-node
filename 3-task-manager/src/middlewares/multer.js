const multer = require('multer');

module.exports = multer({
    // If we do not specify the destinatiion, multer will pass as a binary to the router.
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        // REGX
        // !file.mimetype.startsWith('image') \.doc$
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image.'))
        }

        cb(undefined, true);
    }
});