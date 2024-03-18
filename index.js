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
    var obj = {data: "Inserted on DB"}
    res.send(JSON.stringify(obj))
  }
})

app.post('/signup', async(req,res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const users = database.collection("users")
  const result = await users.insertOne(user)
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  if(result.insertedId != null){
    var obj = { message: "Registered Successfully" }
    res.send(JSON.stringify(obj))
  }
})

app.post('/signin', async(req,res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const users = database.collection("users")
  const result = await users.findOne(user)
  console.log(result)
  if(result.email == req.body.email && result.password == req.body.password){
    var obj = { message: "Login Successfully" }
    res.send(JSON.stringify(obj))
  } else {
    var obj = { message: "Invalid Credentials" }
    res.send(JSON.stringify(obj))
  }
})


app.listen(PORT, () => {
  console.log("listening for requests");
})
