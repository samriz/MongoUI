import * as mongodb from "mongodb";

export default class MongoCollections
{
    #server;
    #dbName;
    #collections;

    /**
     * @param {string} server 
     * @param {string} dbName
     */
    constructor(server, dbName)
    {
        //if(server.startsWith("/")) server.
        this.#collections = new Array();
        if (server.endsWith("/") === false) server = server.concat("/");
        this.#server = server;
        this.#dbName = dbName;        
    }

    /***
     * @param {boolean} fetch
     */
    async getDocument(fetch = true)
    {
        if(fetch)
        {
            this.#collections = this.#connectToDBAndGetADocument();
            return this.#collections;
        }
        else return this.#collections;
    }

    /**
     * @param {string} document 
     * @returns 
     */
    async #connectToDBAndGetADocument(document="employment_history")
    {
        const client = new mongodb.MongoClient(this.#server);
        try
        {
            await client.connect();
            const db = new mongodb.Db(client, this.#dbName);
            //const collectionsArray = await db.listCollections().toArray();            
            //console.log(collectionsArray);
            db.collections
            const employment_history = db.collection(document);
            const cursor = employment_history.find({});
            let arrDocuments = new Array();
            await cursor.forEach((doc) => {
                arrDocuments.push(doc);
            });
            return arrDocuments;
        }
        finally
        {
            //Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    
    async getAllCollections()
    {
        const client = new mongodb.MongoClient(this.#server);
        //let collectionNamesArr = new Array();
        try
        {
            await client.connect();
            const db = new mongodb.Db(client, this.#dbName);
            //const collectionsArray = await db.listCollections().toArray();
            //const collections = await db.collections({nameOnly: true});
            const collections = await db.collections();
            //let collections = db.listCollections().toArray();
            //console.log(`collections: ${collections}`);
            for(let i = 0; i < collections.length; i++)
            {
                console.log(`collections[i]: ${collections[i].collectionName}`);
            }
            return collections;
        }
        finally
        {
            //Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}