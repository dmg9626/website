// game.js - called when querying data for game.html
// grabs data from games.json

`use strict`
var fs = require('fs');

class Game{
	
	static getAttribute(gameId, attribute) {
		console.log("requested " + attribute + " of " + gameId);

		if(!this.gameExists(gameId)) {
			console.log("game " + gameId + " not found");
			return;
		}
		
		// get json
		var gameData = getGameJson();

		// get game
		var game = gameData[gameId]
		
		// check if game has attribute
		if(!game.hasOwnProperty(attribute)) {
			console.log("attribute " + attribute + " not found for game + " + gameId);
			return;
		}
		
		return game[attribute];
	}

	static getGames() {

		// load json
		var gameData = getGameJson();

		// return list of immediate children (game ids)
		return Object.keys(gameData);
	}

	static getPlayableGames() {
		console.log("requested list of playable games:");

		// load games.json
		var gameData = getGameJson();

		// create list of playable games
		var playableGames = new Array();

		// loop through json and add playable games to list
		Object.keys(gameData).forEach(function(gameId) {
			if(gameData[gameId].playable) {
				playableGames.push(gameId);
			}
		});

		console.log(playableGames);
		return playableGames;
	}

	static gameExists(gameId) {
		var gameData = getGameJson();
		return gameData[gameId] != null;
	}
}


// returns games.json
function getGameJson() {
	// load and parse games json
	var gameJson = fs.readFileSync("data/games.json");
	var gameData = JSON.parse(gameJson);
	return gameData;
}

exports.Game = Game;
