const jwt = require('jsonwebtoken');

const clave = "mi-clave-firmadora-de-tokens";
const payload = { _id: "23j23kjn434343jn3j4n3", name: "robertito" };
const token = jwt.sign( payload, clave, {expiresIn: '2 days'});

console.log(token);

const data = jwt.verify(token, clave);

console.log(data);