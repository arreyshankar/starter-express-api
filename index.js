const express = require('express')
//const mongoose = require('mongoose')
const { MongoClient } = require("mongodb");
const app = express()
const bodyParser = require('body-parser'); 
const PORT = 3000
const uri = "mongodb+srv://sarvesh:mevo123@testingcluster.tg9uqrx.mongodb.net/?retryWrites=true&w=majority&appName=TestingCluster";
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
const client = new MongoClient(uri);
const database = client.db('mevo');
const users = database.collection('users');

/*
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
*/
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo it worked!')
})

app.post('/signup',(req,res) => {
  //const user = req.body
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  console.log(user)
  const result = users.insertOne(user);
  if(result != null){
    res.send("Success")
  } else {
    res.send("failed")
  }

  //obj = { id : 1, name : "shankar" }
  //res.end(JSON.stringify(obj))
})

app.listen(PORT, () => {
  console.log("listening for requests");
})
/*
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
*/