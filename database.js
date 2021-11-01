const { MongoClient } = require('mongodb');

async function main(){

    //connection uri with user name and password
    const uri = "mongodb+srv://bechir:azerty123@cluster0.6igzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);
    
    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }
    

}


main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    });
}