const { connect } = require('mongoose');

const connectionURL = process.env.MONGODB_URL;

async function connectToMongoDB() {
    try {
        await connect(connectionURL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    } catch (error) {
        const { message } = error;
        console.error("ERROR", "[connectToMongoDB]", message);
        process.exit(1);
    }
}


connectToMongoDB();