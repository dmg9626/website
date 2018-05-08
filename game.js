// game.js - called when querying data for game.html
// grabs data from games.json

`use strict`
var fs = require('fs');

class Game{

	static HelloWorld() {
		console.log("hello world");
	}

	// returns game name
	static getGameName(gameId) {
		console.log("requested game name of " + gameId);

		// get games json
		var gameData = getGameJson(gameId);

		// find game by game id
		return gameData[gameId].name;
	}
	
	// returns game description 
	static getGameDescription(gameId) {
		console.log("requested game description of " + gameId);

		// get games json
		var gameData = getGameJson(gameId);

		// find game by id
		return gameData[gameId].description;
	}
}


// returns games.json
function getGameJson(gameId) {
	// load and parse games json
	var gameJson = fs.readFileSync("data/games.json");
	var gameData = JSON.parse(gameJson);
	return gameData;
}

exports.Game = Game;
