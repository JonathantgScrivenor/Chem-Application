const path = require('path')
const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('Welcome');
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

app.use(express.urlencoded({extended: false}));

app.listen(port, ()=> {
    console.log(`Port found on ${port}`) 
})

