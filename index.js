const express = require('express')
const { MongoClient } = require("mongodb");
const app = express()
const bodyParser = require('body-parser'); 
const PORT = 3000
const uri = "mongodb+srv://sarvesh:mevo123@testingcluster.tg9uqrx.mongodb.net/?retryWrites=true&w=majority&appName=TestingCluster";
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
const client = new MongoClient(uri);

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo it worked!')
})

app.post('/test',(req,res)=>{
  const data = {
    data: req.body.data
  }
  insert(data).catch(console.dir)
  var obj = {status: "okay"}
  res.send(JSON.stringify(obj))

})

async function insert(data){
  try {
    const database = client.db("mevo");
    const test = database.collection("testAndroid");
    const result = await test.insertOne(data);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    //await client.close();
  }
}

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
    const database = client.db("mevo");
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
