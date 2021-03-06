
const sharp = require('sharp');

module.exports = async (buffer) => {
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