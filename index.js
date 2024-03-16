const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const url = ""

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post('/TEST',(req,res)=>{
    res.send("TEST123")
})

app.listen(process.env.PORT || 3000)