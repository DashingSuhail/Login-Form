const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SignUpform');
var db = mongoose.connection;
db.on('error' , console.log.bind(console, "connection error"));
db.once('open' , function(callback){
    console.log("connection successful");
})
var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/login' , function(req,res){
    return res.redirect('login.html');
})
app.post('/login' , function(req,res){
    var email = req.body.email;
    var password= req.body.password;
    var data = {
        "email" : email,
        "password" : password
    }
    db.collection('data').findOne(data , function(err,collection){
        if(collection == null){
            return res.redirect('login_unsuccess.html');
        }else{
            return res.redirect('login_success.html');
        }
    });
   
});
app.post('/sign_up' , function(req,res){
    var email = req.body.email;
    var password= req.body.password;
    var data = {
        "email" : email,
        "password" : password
    }
    db.collection('data').insertOne(data , function(err,collection){
        if (err) throw err;
        else{
            console.log("Record inserted");
        }
    });
    return res.redirect('signup_success.html');
});

app.get('/' , function(req,res){
    res.set({
        'Access-Control-Allow-Origin' : '*'
    });
    return res.redirect('index.html');
}).listen(3000)
console.log("Server is listening on port 3000");

 

