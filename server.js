// load modules
var express = require('express');
var path = require('path');
var fs = require('fs');

// game module
var game = require('./game');
game.Game.HelloWorld();

var app = express();

app.use(express.static("."));
app.listen(8080, function(){
    console.log("Server running...");
});

app.get('/game', function(req, res){
	// serve game.html
	res.sendFile(path.join(__dirname + "/game.html"));

	// testing calls to game.js module
	console.log("game name: " + game.Game.getGameName(req.query.gameId));
	console.log("game description: " + game.Game.getGameDescription(req.query.gameId));
});

app.get('/getGameData', function(req, res){
	// todo: serve game data using client query
	// possibly serve array/dictionary of json objects containing each piece of data (name, description, etc.)?
	
	// get name and description
	var name = game.Game.getGameName(req.query.gameId);
	var description = game.Game.getGameDescription(req.query.gameId);
	
	// put in json object
	var json = {
		"name": name,
		"description": description
	};
	
	// send as string (TODO: send as json obj)
	res.send(JSON.stringify(json));
});
