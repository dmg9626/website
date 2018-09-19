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

// serves about.html
app.get('/about', function(req, res){
	res.sendFile(path.join(__dirname + "/about.html"));
});

// returns list of gameIds
/* 
	struture: 	
			{ 
				"gameId": {
					"thumbnail": "image_path",
					"short description": "short_description"
				},
				"anotherGameId": {
					...
				}
			}
*/

app.get('/games', function(req,res){
	res.sendFile(path.join(__dirname + "/games.html"));
});

app.get('/getGames', function(req, res){
	console.log("requested list of all games");
	var gameIds = game.Game.getGames();
	console.log(gameIds);
	
	// create games object
	var games = {};
	for(var id in gameIds) {
		console.log("getting thumbnail for " + gameIds[id]);
		var name = game.Game.getAttribute(gameIds[id], "name");
		var thumbnail = game.Game.getAttribute(gameIds[id], "thumbnail");
		var shortDescription = game.Game.getAttribute(gameIds[id], "shortDescription");
		console.log(thumbnail);
		
		games[gameIds[id]] = {
			"name": name,
			"thumbnail": thumbnail,
			"shortDescription": shortDescription
		};
	}
	console.log(games);

	res.send(games);
});

// returns page containing playable game
// NOT WORKING - RETURNED PAGE CANNOT LOAD .js AND .css
app.get("/playGame", function(req,res){
	var reqGameId = req.query.gameId;

	if(!game.Game.gameExists(reqGameId)) {
		console.log("game " + reqGameId + " doesn't exist");

		// TODO: send a more helpful error message, maybe a 404
		res.send("game " + reqGameId + " doesn't exist");
		
	}

	// get list of playable games
	var gameIds = game.Game.getPlayableGames();

	// check if requested game in list
	var reqGameId = req.query.gameId;
	if(gameIds.includes(reqGameId)) {
		console.log("game " + reqGameId + " playable, returning page");
		// res.send("/games/" + reqGameId + "/");
		res.sendFile(path.join(__dirname + "/games/" + reqGameId + "/index.html"));
	}
	else {
		console.log("game " + reqGameId + " not playable");
	}
	
});

// returns data associated with provided gameId
app.get('/getGameData', function(req, res){

	// get games list and requested gameId
	var games = game.Game.getGames();
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
		var playable = game.Game.getAttribute(req.query.gameId, "playable");
		var link = game.Game.getAttribute(req.query.gameId, "link");
		
		console.log("name: " + name);
		console.log("short description: " + shortDescription);
		console.log("description: " + description);
		console.log("images: " + images);
		console.log("playable: " + playable);
		console.log("link: " + link);
		
		// put in json object
		var json = {
			"name": name,
			"shortDescription": shortDescription,
			"description": description,
			"coverImage": coverImage,
			"images": images,
			"playable": playable,
			"link": link
		};
		
		// send as string (TODO: send as json obj)
		res.send(JSON.stringify(json));
	}
});

app.get('/getAboutData', function(req, res){
	console.log("requesting about.json");
	
	// load and parse games json
	var about = fs.readFileSync("data/about.json");
	var aboutJson = JSON.parse(about);
	console.log(aboutJson);

	res.send(aboutJson);
});