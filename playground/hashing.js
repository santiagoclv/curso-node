const bcrypt = require('bcryptjs');


async function name() {
    const pass = "hola mundo";
    const hashedPass = await bcrypt.hash(pass, 8);

    
    const isMatch = await bcrypt.compare(pass, hashedPass);
    const isNotAMatch = await bcrypt.compare('pass8', hashedPass);

    
    console.log(pass, hashedPass, isMatch, isNotAMatch);
}

name();