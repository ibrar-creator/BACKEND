const express = require('express');
const app = express();
app.get('/', (req, res)=>{
    res.send('Hello world')
})
app.get('/home', (req, res)=>{
    res.send("Wellcom on Home page")
})
app.get('/about', (req, res)=>{
    res.send("Wellcom on About page")
})
app.listen(3000)