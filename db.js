const { MongoClient } = require("mongodb");

const MONGODB_URI =
  "mongodb+srv://fatmabenyouness:Fatma**1990@cluster0.40lzdhn.mongodb.net/?retryWrites=true&w=majority";

let db;

async function connectToDatabase() {

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db("mydb");
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("Connected to MongoDB");
   return db

  } catch (err) {
    console.log("Error: " + err.message);

  }
}

module.exports = connectToDatabase;
