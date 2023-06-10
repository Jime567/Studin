const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
token: uuid.v4();
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('studin');
const eventCollection = db.collection('events');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const userCollection = db.collection('user');

function getUser(dinID) {
    return userCollection.findOne({dinID: dinID});
}

async function createUser(dinID, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = {
        dinID: dinID,
        password: passwordHash,
        token: uuid.v4()
    };

    await userCollection.insertOne(user);
    return user;
}

//Test la connec'ion
(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
    console.log("Secret Database Connected");
})().catch((ex) => {
    console.log(`Unable to connect to the stupid database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function deleteEvent(event) {
    const result = await eventCollection.deleteMany({name: event});
    return result;
}

async function addEvent(event) {
    const result = await eventCollection.insertOne(event);
    return result;
}

async function getEvents() {
    const events = await eventCollection.find();
    return events.toArray();
}

module.exports = {addEvent, getEvents, deleteEvent, getUser, createUser};