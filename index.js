const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const bodyParser = require('body-parser'); 
const PORT = 3000
const uri = "mongodb+srv://sarvesh:mevo123@testingcluster.tg9uqrx.mongodb.net/?retryWrites=true&w=majority&appName=TestingCluster";
const client = new MongoClient(uri);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

client.connect(err => {
    if(err){ console.error(err); return false;}
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});