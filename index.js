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
//const database = client.db('mevo');
//const users = database.collection('users');

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
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  insertUser(user)

})

async function insertUser(doc){
  try {
    const database = client.db("mevo");
    const haiku = database.collection("users");
    const result = await haiku.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

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