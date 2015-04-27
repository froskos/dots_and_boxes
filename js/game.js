var Game = {
	// We could extract players as different objects and do more things, like keeping a game history!
	_player1: {colour: Config.player1Colour, completedBoxes:0 },
	_player2: {colour: Config.player2Colour, completedBoxes:0 },
	
	totalBoxes: Config.boardSize * Config.boardSize,

	_currentPlayer: null,

	setCurrentPlayer: function (player) {
		this._currentPlayer = player;
	},

	getCurrentPlayer: function () {
		return this._currentPlayer;
	},

	//This method could be a potential instance method for a player object as well
	increaseCompletedBoxes: function (player) {
		player.completedBoxes += 1;
	},

	togglePlayer: function () {
		this.setCurrentPlayer(this._currentPlayer === this._player1? this._player2 : this._player1);
	},

	getWinner: function () {
		return this._player1.completedBoxes > this._player2.completedBoxes?
			this._player1 :
			(this._player1.completedBoxes == this._player2.completedBoxes? null : this._player2 );
	},

	clearPlayerScores: function () {
		this._player1.completedBoxes = 0;
		this._player2.completedBoxes = 0;
	},


	isFinished: function () {
		return (this._player1.completedBoxes + this._player2.completedBoxes) == this.totalBoxes;
	},

	init: function () {
		Board.create();
		Board.render();
		Game.setCurrentPlayer(this._player1);
		this.renderInfo();
		$('#new-game').click(this.restartClicked);
	},

	// Handler for when a line is clicked
	lineClicked: function (event) {
		var lineObj =	$(this).data('LineObj');
		
		lineObj.mark();
		if( !lineObj.hasClosedBox() ) {
			Game.togglePlayer();			
		}
		Board.render();
		Game.renderInfo();
	},

	// Handler for the restart button click event
	restartClicked: function () {
		Board.reset();
		Game.clearPlayerScores();
		Game.setCurrentPlayer(Game._player1);
		Game.renderInfo();
	},

	// Renders feedback about the game status
	renderInfo: function () {
		if(this.isFinished()) {
			if(this.getWinner()) {
				$('.current-message').text("Game over! The winner is " + this.getWinner().colour + " player");
			} else {
				$('.current-message').text("You tied! Well played!");
			}
		}
		else {
			$('.current-message').text("Current player: " + this.getCurrentPlayer().colour);
		}
		$('.player1-score').text(this._player1.colour + " player: " + this._player1.completedBoxes + " boxes.")
		$('.player2-score').text(this._player2.colour + " player: " + this._player2.completedBoxes + " boxes.")

	}
}

