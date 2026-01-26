const express = require('express');
const app = express()
app.use(express.json());

const notes = []
app.get('/notes', (req, res)=>{
     res.status(200).json({
    notes: notes
 })
})
app.post('/notes', (req, res)=>{
 console.log(req.body);
 notes.push(req.body);
 res.status(201).json({
    message:"note is added sucsessfully"
 })
 app.delete("/notes/:index", (req, res)=>{
   delete notes[req.params.index]
         res.status(204).json({
    message: "notes deleted sucsessfully"
 })
 })
 app.patch("/notes/:index", (req, res)=>{
   notes[req.params.index].name = req.body.name
         res.status(200).json({
    message: "notes name change sucsessfully"
 })
 })
  
})
module.exports = app