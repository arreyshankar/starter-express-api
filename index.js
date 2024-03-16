const express = require('express')
const app = express()

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/TEST',(req,res) => {
    res.send('GET METHOD RESPONSE FROM SERVER')
})

app.listen(process.env.PORT || 3000)