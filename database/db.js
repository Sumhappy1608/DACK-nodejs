const { MongoClient } = require('mongodb');

let abc;

async function main(){
    const uri = "mongodb+srv://new-user132:Ryg5uZEPeTyJtx0v@cluster0.on5vo.mongodb.net/books_library?retryWrites=true&w=majority"; 
    const client = new MongoClient(uri); 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    abc = await client.db("books_library").collection("books").find({}).toArray();
    //console.log(abc);
};

exports.getbooks = async () => {
    const bookss = await client.db("books_library").collection("books").find({}).toArray();
    return bookss;
}

const db = () => abc;

module.exports.db = db;