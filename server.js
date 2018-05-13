// load modules
var express = require('express');
var path = require('path');
var fs = require('fs');

// game module
var game = require('./game');

var app = express();
var port = 8081;

app.use(express.static("."));
app.listen(port, function(){
    console.log("Server running...");
});

// serves game.html
app.get('/game', function(req, res){
	res.sendFile(path.join(__dirname + "/game.html"));
});

// returns list of gameIds
app.get('/getGameIds', function(req, res){
	var games = game.Game.getGameIds();
	res.send(games);
});

// returns data associated with provided gameId
app.get('/getGameData', function(req, res){

	// get games list and requested gameId
	var games = game.Game.getGameIds();
	var gameId = req.query.gameId;

	// check if game exists
	if(games.indexOf(gameId) == -1) {
		console.log("ERROR: game " + gameId + " not found");

		// TODO: send a more helpful error message
		res.send(null);
	}

	else {
		// get attributes
		var name = game.Game.getAttribute(req.query.gameId, "name");
		var description = game.Game.getAttribute(req.query.gameId, "description");
		var shortDescription = game.Game.getAttribute(req.query.gameId, "shortDescription");
		var coverImage = game.Game.getAttribute(req.query.gameId, "coverImage");
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
			"coverImage": coverImage,
			"images": images
		};
		
		// send as string (TODO: send as json obj)
		res.send(JSON.stringify(json));
	}
});
