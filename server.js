// load modules
var express = require('express');
var path = require('path');
var fs = require('fs');

// game module
var game = require('./game');

var app = express();

app.use(express.static("."));
app.listen(8080, function(){
    console.log("Server running...");
});

app.get('/game', function(req, res){
	// serve game.html
	res.sendFile(path.join(__dirname + "/game.html"));
});

app.get('/getGameData', function(req, res){
	// todo: serve game data using client query
	// possibly serve array/dictionary of json objects containing each piece of data (name, description, etc.)?
	
	// get name and description
	//var name = game.Game.getName(req.query.gameId);
	//var description = game.Game.getDescription(req.query.gameId);
	//var images = game.Game.getImages(req.query.gameId);
	
	// get attributes
	var name = game.Game.getAttribute(req.query.gameId, "name");
	var description = game.Game.getAttribute(req.query.gameId, "description");
	var shortDescription = game.Game.getAttribute(req.query.gameId, "shortDescription");
	var images = game.Game.getAttribute(req.query.gameId, "images");
	
	console.log("name: " + name);
	console.log("short description: " + shortDescription);
	console.log("description: " + description);
	console.log("images: " + images);
	
	// put in json object
	var json = {
		"name": name,
		"shortDescription": shortDescription,
		"description": description,
		"images": images
	};
	
	// send as string (TODO: send as json obj)
	res.send(JSON.stringify(json));
});
