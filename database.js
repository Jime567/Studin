const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('studin');
const eventCollection = db.collection('events');

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

module.exports = {addEvent, getEvents, deleteEvent};