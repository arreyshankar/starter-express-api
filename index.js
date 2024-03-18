const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser'); 
const PORT = 3000
const uri = "mongodb+srv://sarvesh:mevo123@testingcluster.tg9uqrx.mongodb.net/?retryWrites=true&w=majority&appName=TestingCluster";

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo it worked!')
})

app.post('/data',(req,res) => {
  const data = req.body
  console.log(data)
  res.send("message okay")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})