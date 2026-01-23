const express = require('express');
const app = express();
app.get('/', (req, res)=>{
    res.send('hallo dunia')
})
app.listen(3000)