const express = require('express');
const app = express();
const port = 3000;

// app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',(req,res)=>{
    const {username} = req.query;
    res.send(`Hello there ${username}`)

})
app.post('/',(req,res)=>{
    const {username} = req.body;
    if (!username){
        res.send('Please provide a username')
    }else
    res.send(`Hello there ${username}`)
    })
app.get('/search',(req,res)=>{
    const {q} = req.query;
    if(!q){
        res.send('Nothing found if nothing searched')
    }else
        res.send(`Search results for : ${q}`)
    })

app.get('/:animal/:sound',(req,res)=>{
    const {animal, sound} = req.params;
    res.send(`The ${animal} says ${sound} ${animal === 'cow'?'moo':'"sorry, do i know you?"' }`)
    })


app.get('*',(req,res)=>{
    res.send('Oops you stumbled on a wrong page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})