// game.js - called when querying data for game.html
// grabs data from games.json

`use strict`
var fs = require('fs');

class Game{
	
	static getAttribute(gameId, attribute) {
		console.log("requested " + attribute + " of " + gameId);

		if(!gameExists(gameId)) {
			console.log("game " + gameId + " not found");
			return;
		}
		
		// get json
		var gameData = getGameJson(gameId);

		// get game
		var game = gameData[gameId]
		
		// check if game has attribute
		if(!game.hasOwnProperty(attribute)) {
			console.log("attribute " + attribute + " not found for game + " + gameId);
			return;
		}
		
		return game[attribute];
	}
}


// returns games.json
function getGameJson(gameId) {
	// load and parse games json
	var gameJson = fs.readFileSync("data/games.json");
	var gameData = JSON.parse(gameJson);
	return gameData;
}

// check if game exists in json file
function gameExists(gameId) {
	var gameData = getGameJson(gameId);
	return gameData[gameId] != null;
}

exports.Game = Game;
