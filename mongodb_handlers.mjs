import MongoCollections from "./collections.mjs";

export default class MongoDBHandlers 
{
  #host;
  #db;
  
  constructor(host, db)
  {
    this.#host = host;
    this.#db = db;
  }

  async getDocument() 
  {
    //"mongodb://localhost:27017/sameer"
    const mCollections = new MongoCollections(this.#host, this.#db);
    let doc = await mCollections.getDocument();
    return JSON.stringify(doc);
  }

  async getCollections() 
  {
    const mCollections = new MongoCollections(this.#host, this.#db);
    let collections = await mCollections.getAllCollections();
    return JSON.stringify(collections);
  }
}