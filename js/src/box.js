/*
	Box constructor
*/

function Box(rowIndex, columnIndex) {
	// Box position in the board
	this._rowIndex = rowIndex;
	this._columnIndex = columnIndex;
	// Completion status
	this._completed = false;
	this._completerPlayer = null;
	// Self-register on creation
	this.register();
}

/*
	Box "class" methods
*/


$.extend(Box, {
	//initially generate a Config.boardSize x Config.boardSize matrix with empty elements
	registry: (function() {
		var rows = new Array(Config.boardSize);
		for(var i=0; i < Config.boardSize; i++) {
			rows[i] = new Array(Config.boardSize);
		}
		return rows;
	})(),


	getByCoords: function (rowIndex, columnIndex) {
		return this.registry[rowIndex][columnIndex];
	},

	template: '<div class="box">'

});

/*
	Box instance methods
*/


$.extend(Box.prototype,{

	register: function () {
		Box.registry[this._rowIndex][this._columnIndex] = this;
	},

	complete: function () {
		this._completed = true;
	},

	isCompleted: function () {
		return this._completed;
	},

	setCompleterPlayer: function (completer) {
		this._completerPlayer = completer;
		Game.increaseCompletedBoxes(completer);
	},

	getCompleterPlayer: function () {
		return this._completerPlayer;
	},

	// Methods returning each of the lines composing the current box
	topLine: function () {
		return Line.registry['rows'][this._rowIndex][this._columnIndex];
	},

	bottomLine: function () {
		return Line.registry['rows'][this._rowIndex +1][this._columnIndex];
	},

	leftLine: function () {
		return Line.registry['columns'][this._columnIndex][this._rowIndex];
	},

	rightLine: function () {
		return 	Line.registry['columns'][this._columnIndex +1][this._rowIndex];
	},

	// Boolean method for determining whether a box is complete
	allLinesMarked: function () {
		return this.topLine().isMarked() && this.bottomLine().isMarked() && this.leftLine().isMarked() && this.rightLine().isMarked();
	},

	calculateCompleted: function () {
		if(this.allLinesMarked()){
			this.complete();
			this.setCompleterPlayer(Game.getCurrentPlayer());
			return true;
		}
		return false;
	}

});
