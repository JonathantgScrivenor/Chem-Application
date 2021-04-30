const path = require('path')
const express = require('express')
const app = express()
const port = 8080
const mongoose = require ('mongoose')
const AuthRoute = require ('./Routes/auth')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')
const loginbool = require ("./Controllers/AuthController")

mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open',() => {
    console.log("Database Connected.")
})

app.set('view engine', 'ejs');

app.use(morgan('dev'))
app.use (bodyParser.urlencoded({extended: true}))
app.use (bodyParser.json())

//if (loginbool == false){
app.get('/', (req, res)=>{
    res.render('login');
    })
//}

app.get('/', (req, res)=>{
    res.render('welcome');
    });
app.get('/about', (req, res)=>{
        res.render('about');
     });
app.get('/ml', (req, res)=>{
        res.render('ml');
});
app.get('/Definitions', (req, res)=>{  
    res.render('Definitions');
})

app.use(express.urlencoded({extended: true}));

app.listen(port, ()=> {
    console.log(`Port found on ${port}`) ;
})

app.use ("/api", AuthRoute)


