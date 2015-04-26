var Game = {
	_player1: 'red',
	_player2: 'yellow',
	// We could extract players as another object and keep a count of the games won!

	_currentPlayer: 'red',

	getCurrentPlayer: function () {
		return this._currentPlayer;
	},

	togglePlayer: function() {
		this._currentPlayer = this._currentPlayer === this._player1? this._player2 : this._player1;
	},

	init: function () {
		Board.create();
		Board.render();
		this.renderInfo();
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
				Game.renderInfo();
			}
			Board.render();
		}
	},

	renderInfo: function () {
		$('.current-player').text("Current player: " + this._currentPlayer);

	}
}

