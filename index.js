const express = require('express')
const fs = require("fs")
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
    roomNo: req.body.roomNo,
    roomName: req.body.roomName,
    isAvailable: req.body.isAvailable
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

app.post('/EditRoom', async(req,res) => {
  const Room = {
    roomNo: req.body.roomNo,
    isAvailable: req.body.isAvailable
  }

  const rooms = database.collection("rooms")
  const result = await rooms.updateOne({ roomNo : req.body.roomNo}, { $set : { isAvailable : req.body.isAvailable } })
  console.log(`A Room document was Updated with the _id: ${result.insertedId}`);
  if(result != null){
    var obj = { message: "Room Updated Successfully" }
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Error while Updating Room" }
    res.status(201).send(JSON.stringify(obj))
  }
})

app.get('/GetRooms', async(req,res) => {
  const rooms = database.collection('rooms')
  const result = await rooms.find().toArray()
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    res.status(201).send(JSON.stringify({ message: "Error Getting rooms" }))
  }
})

app.get('/GetDoctors', async(req,res) => {
  const doctors = database.collection('doctors')
  const result = await doctors.find().toArray()
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    res.status(201).send(JSON.stringify({ message: "Error Getting rooms" }))
  }
})

app.post('/AddPatient', async(req,res) => {
  const patient = {
    PatientName : req.body.PatientName,
    PatientAge : req.body.PatientAge,
    PatientContact : req.body.PatientContact,
    PatientAddress : req.body.PatientAddress,
    PatientGender : req.body.PatientGender,
  }

  let base64Image = req.body.PatientImage.split(';base64,').pop();
  fs.writeFile(`../Images/${req.body.PatientName}.png`, base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});
  const patients = database.collection("patients")
  const result = await patients.insertOne(patient)
  console.log(`A Patient document was inserted with the _id: ${result.insertedId}`);
  if(result != null){
    var obj = { message: "Patient Added Successfully" }
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Error while Adding" }
    res.status(201).send(JSON.stringify(obj))
  }
})

app.get('/GetNotifications', async(req,res) => {
  const notifications = database.collection('notifications')
  const result = await notifications.find().toArray()
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    res.status(201).send(JSON.stringify({ message: "Error Getting notifications" }))
  }
})

app.get('/GetMedicines', async(req,res) => {
  const medicines = database.collection('medicines')
  const result = await medicines.find().toArray()
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    res.status(201).send(JSON.stringify({ message: "Error Getting medicines" }))
  }
})

app.post('/AddMedicine', async(req,res) => {
  const medicine = {
    MedicineName : req.body.MedicineName,
    MedicineID : req.body.MedicineID,
    MedicineQty : req.body.MedicineQty
  }

  const medicines = database.collection('medicines')
  const result = await medicines.insertOne(medicine)
  console.log(`A Medicine document was inserted with the _id: ${result.insertedId}`);
  if(result != null){
    var obj = { message: "Medicine Added Successfully" }
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    var obj = { message: "Error while Adding" }
    res.status(201).send(JSON.stringify(obj))
  }
})

app.post('/GetPatients', async(req,res) => {
  const doctors = database.collection('patients')
  const result = await doctors.find().toArray()
  if(result != null){
    res.status(200).send(JSON.stringify(result))
  } else if(result == null){
    res.status(201).send(JSON.stringify({ message: "Error Getting Patients" }))
  }
});

app.listen(PORT, () => {
  console.log("listening for requests");
})
