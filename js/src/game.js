var Game = {
	_player1: {colour:'red', completedBoxes:0 },
	_player2: {colour:'yellow', completedBoxes:0 },
	totalBoxes: Config.boardSize * Config.boardSize,
	// I could extract players as another object and do more things, like keeping a count of the games won by each player!

	_currentPlayer: null,

	setCurrentPlayer: function (player) {
		this._currentPlayer = player;
	},

	getCurrentPlayer: function () {
		return this._currentPlayer;
	},

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

	init: function () {
		Board.create();
		Board.render();
		Game.setCurrentPlayer(this._player1);
		this.renderInfo();
		$('#new-game').click(this.restartClicked);
	},

	isFinished: function () {
		// console.info(this.totalBoxes)
		// console.info("acumuladas: " + (this._player1.completedBoxes + this._player1.completedBoxes));
		// debugger;
		return (this._player1.completedBoxes + this._player2.completedBoxes) == this.totalBoxes;
	},

	// Handler for when a line is clicked
	lineClicked: function (event) {
		var lineObj =	$(this).data('LineObj');
		if (lineObj.isMarked()) {
			return false;
		}
		else {
			var boxes;
			
			lineObj.mark();
			if( !lineObj.checkIfClosedBox() ) {
				Game.togglePlayer();
				
			}
			Board.render();
			Game.renderInfo();
		}
	},

	restartClicked: function () {
		Board.reset();
		Game.clearPlayerScores();
		Game.setCurrentPlayer(Game._player1);
		Game.renderInfo();
	},

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

