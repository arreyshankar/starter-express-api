const express = require('express')
const app = express()

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post('/TEST', function requestHandler(req, res) {
    res.end('Hello, World!');
  });

app.listen(process.env.PORT || 3000)