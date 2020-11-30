const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://new-user132:Ryg5uZEPeTyJtx0v@cluster0.on5vo.mongodb.net/books_library?retryWrites=true&w=majority"; 

const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("books_library");
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;