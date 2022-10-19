//import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
const app = express();
//add router in express app
app.use("/",router);

//Here, we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => 
{  
  res.sendFile("C:/GitRepositories/MongoUI/index.html");
});

import MongoDBHandlers from "./mongodb_handlers.mjs";
app.post("/MongoCollections", async (req, res) => {

  //parameters from ajax call
  let host = req.body.host;
  let db = req.body.db;
  
  let mh = new MongoDBHandlers(host, db);
  res.send(await mh.getDocument());

});

app.post('/allCollectionNames', async (req, res) => {

  let host = req.body.host;
  let db = req.body.db;
  
  let mh = new MongoDBHandlers(host, db);
  res.send(await mh.getCollections());

});

app.listen(8080);