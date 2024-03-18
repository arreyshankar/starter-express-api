const express = require('express')
const { MongoClient } = require("mongodb");
const app = express()
const bodyParser = require('body-parser'); 
const PORT = 3000
const uri = "mongodb+srv://sarveshkumar10101:sarvesh121@testingcluster.tg9uqrx.mongodb.net/?retryWrites=true&w=majority&appName=TestingCluster";
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
const client = new MongoClient(uri);
const database = client.db("mevo");

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo it worked!')
})

app.post('/test', async(req,res)=>{
  const data = {
    data: req.body.data
  }
  const collection = database.collection("testAndroid");
  const result = await collection.insertOne(data)
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  if(result.insertedId != null){
    var obj = {status: "Inserted"}
    res.send(JSON.stringify(obj))
  }
  

})

app.post('/signup',(req,res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  insertUser(user).catch(console.dir)
})

async function insertUser(doc){
  try {
    const users = database.collection("users");
    const result = await users.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

app.listen(PORT, () => {
  console.log("listening for requests");
})
