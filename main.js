require('dotenv').config();
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const { connectToDB, client, dbName } = require("./db");
const app = express();
app.use(bodyparser.json());
app.use(cors());

app.get("/user", async (req, res) => {
  const db = client.db(dbName);
  const usersCollection = db.collection("users");
  const result = await usersCollection.find({}).toArray();
  res.send({ response: result });
});

app.post("/user", async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(req.body);
    res.send({ response: result });
  } catch (error) {
    res.status(500);
  }
});

app.put("/user", async (req, res) => {
  const { id, name, email, gender, status } = req.body;
  const db = client.db(dbName);
  const usersCollection = db.collection("users");
  const query = { id: id };
  const newValues = { $set: { name, email, gender, status } };
  const result = await usersCollection.updateOne(query, newValues);
  res.send({ response: result });
});

app.delete("/user", async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const usersCollection = db.collection("users");
  const result = await usersCollection.deleteOne({ id: id });
  res.send({ response: result });
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Listening to port ${process.env.PORT}...`);
});
