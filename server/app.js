var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

var Hero = require('../models/createHero');//requiring the model with Schema.

mongoose.connect('mongodb://localhost:27017/assessment');//connecting to database

app.listen(4242, 'localhost', function(req, res){
  console.log('listening on 4242');
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

app.use(express.static('public'));

app.post('/sendHero', function(req, res){
  console.log('in sendHero');
  var newHero = new Hero({
    alias: req.body.alias,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    power_name: req.body.power_name
  });//end newHero
  console.log(newHero);
  //saves object into database
  newHero.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.sendStatus(200);
    }
  });//end save
});//end sendHero

app.get('/showHero', function(req, res){
  Hero.find()
  .then(function(data){
    res.send(data);
  });
});//end showHero
