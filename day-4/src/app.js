const express = require('express');
const app = express();
app.use(express.json());
const notes = [];
app.post('/notes', (req, res)=>{
    console.log(req.body);
    
    notes.push(req.body);
    res.send('notes is added');
})
app.patch('/notes/:index', (req, res)=>{
    notes[req.params.index].name = req.body.name
 res.send('notes updated');
})
app.delete('/notes/:index', (req, res)=>{
   delete notes[req.params.index]
 res.send('notes updated');
})
app.put('/notes/:index', (req, res)=>{
   notes[req.params.index] = req.body
 res.send('notes all updated');
})
app.get('/notes', (req, res)=>{
    res.send(notes);
})
module.exports = app;