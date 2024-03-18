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
  if(result != null){
    var obj = { message: "Login Successfully" }
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Invalid Credentials" }
    res.status(205).send(JSON.stringify(obj))
  }
})

app.post('/AddRoom', async(req,res) => {
  const room = {
    roomNo: req.body.RoomNo,
    roomName: req.body.RoomName,
    isAvailable: req.body.Available
  }

  const rooms = database.collection("rooms")
  const result = await rooms.insertOne(room)
  console.log(`A Room document was inserted with the _id: ${result.insertedId}`);
  if(result != null){
    var obj = { message: "Room Added Successfully" }
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Error while Adding" }
    res.status(201).send(JSON.stringify(obj))
  }
})

app.post('/GetRooms', async(req,res) => {
  const rooms = database.collection('rooms')
  const result = await rooms.find()
  console.log(result)
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Error while Adding" }
    res.status(201).send(JSON.stringify(obj))
  }
})

app.listen(PORT, () => {
  console.log("listening for requests");
})
