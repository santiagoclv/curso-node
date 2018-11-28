const { MongoClient, Logger, ObjectID } = require('mongodb');
const assert = require('assert');

require('dotenv').config();

const key = 33333333;

const defaultData = {
    name: "Yo",
    age: 29
}

const mongouri =  process.env.MONGO_URI;

MongoClient.connect(mongouri, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    Logger.setLevel('info');

    console.log('Instan random (_id): ', ObjectID());


    // I could create more database references from this same client
    const db = client.db('todo-db');
    const colTodos = db.collection('todos');

    // find all by a filter
    // const filter = { someField: param };
    // colTodos.find(filter)

    // find return a Cursor http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html
    // with a lot of method that allow to handle the

    // const findOrCreateByAppKey = (key) => colTodos.findOne({ key })
    //     .then(settings => {
    //         if (settings) {
    //             return settings;
    //         } else {
    //             return colTodos.insertOne({ key, ...defaultData }).then( result => result.ops[0] );
    //         }
    //     });

    
    // colTodos.updateOne({ key }, { $set: settings }, { upsert: true })
    //         .then( () => {
    //             findOrCreateByAppKey(key).then(data => {
    //                 resRenderAdmin(res, key, data);
    //             });
    //         });

    // colTodos.findOneAndDelete({ key })
    //         .then( (res) => {
    //             console.log(JSON.stringify(results, undefined, 2))
    //         });

    // colTodos.deleteOne({ key })
    //         .then( (res) => {
    //             console.log(JSON.stringify(results, undefined, 2))
    //         });

    // colTodos.deleteMany({ text })
    //         .then( (res) => {
    //             console.log(JSON.stringify(results, undefined, 2))
    //         });

    client.close();
});