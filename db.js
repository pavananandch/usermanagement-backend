const MongoClient = require("mongodb").MongoClient;
const dbName = "UserManagement";
const URI = process.env.URI;
const client = new MongoClient(URI, {useNewUrlParser: true, useUnifiedTopology: true,});
async function connectToDB() {
    try {
        await client.connect();
        console.log("connected to DB");
    } catch (error) {
        console.log("Error connecting to db");
    }
}

module.exports = {
    client,
    connectToDB,
    dbName
}