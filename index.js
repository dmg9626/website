// load modules
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static("."));
app.listen(8080, function(){
    console.log("Server running...");
});

app.get('/game', function(req, res){
    res.sendFile(path.join(__dirname + "/game.html"));
});