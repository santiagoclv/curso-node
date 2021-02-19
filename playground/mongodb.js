require("dotenv/config");
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DB_NAME;

const playground = async () => {    
    const connection = await MongoClient.connect( connectionURL, { useNewUrlParser: true });
    const db = await connection.db(databaseName);
    
    const users = await db.collection('users');    
    
    await users.insertOne({ name: "Chapo", age: 45 });
    await users.insertOne({ name: "Roberto", age: 425 });
    await users.insertOne({ name: "Santiago", age: 245 });

    const roberto_id = ObjectID("603019ef0a4a2c40f4ea84e0");
    const roberto = await users.findOne({ _id: roberto_id });
    const todos = await users.find({}).toArray();

    await users.updateMany({  }, {
        "$set": {
            name: "Chicho"
        },
        "$inc": {
            age: 2
        }
    });

    const todos_mod = await users.find({}).toArray();

    console.log({roberto, todos, todos_mod});

    await users.deleteMany({});


}

playground();