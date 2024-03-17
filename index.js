const express = require('express')
const app = express()
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/TEST',function(req,res){
    var data = req.body.data; 
	console.log(data); 
    res.send("SUCCESSSSSSSSSSS")
	//res.status(200).json({ 
    //    message: "JSON Data received successfully" 
	//}); 
})

app.listen(process.env.PORT || 3000)