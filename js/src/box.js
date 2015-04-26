/*
	Box constructor
*/

function Box(rowIndex, columnIndex) {
	// Box position in the board
	this._rowIndex = rowIndex;
	this._columnIndex = columnIndex;
	// Completion status
	this._completed = false;
	this._completedBy = null;
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

});

/*
	Box instance methods
*/


$.extend(Box.prototype,{

	register: function () {
		Box.registry[this._rowIndex][this._columnIndex] = this;
	}
});
