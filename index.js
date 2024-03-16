const express = require('express')
const app = express()
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/TEST',(req,res) => {
    var data = req.body.data; 
	console.log(data); 
	res.status(200).json({ 
        message: "JSON Data received successfully" 
	}); 
})

app.listen(process.env.PORT || 3000)