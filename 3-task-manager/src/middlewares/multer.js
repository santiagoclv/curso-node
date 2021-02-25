const multer = require('multer');
const sharp = require('sharp');

module.exports.imageAvatar = multer({
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

module.exports.convertAvatar = async (buffer) => {
    return sharp(buffer)
            .resize({
                width: 200,
                height: 200,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .png()
            .toBuffer();
} 