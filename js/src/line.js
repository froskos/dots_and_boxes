/*
	Line constructor
*/

function Line(type, rowOrColumnIndex, lineIndex) {
	this._type = type;
	this._rowOrColumnIndex = rowOrColumnIndex; //index of the column or row containing the line if it is vertical
	this._lineIndex = lineIndex; //the index of the line inside its row or column
	this._marked = false;
	this._boxes = null;
	this.register();
}

/*
	Line 'class' methods
*/

$.extend(Line, {
	//Generates two empty (Config.boardSize+1 X Config.boardSize) matrices, for representing rows of horizontal lines and columns of vertical lines 
	registry: (function() {
		var rows = new Array(Config.boardSize + 1),
		columns = new Array(Config.boardSize + 1);
		for(var i=0; i <= Config.boardSize; i++) {
			rows[i] = new Array(Config.boardSize);
			columns[i] = new Array(Config.boardSize);
		}
		return {rows:rows,columns:columns};
	})(),


	getByCoords: function (rowsOrColumns, rowOrColumnIndex,lineIndex) {
		return this.registry[rowsOrColumns][rowOrColumnIndex][lineIndex];
	},

});

/*
	Line instance methods
*/

$.extend(Line.prototype,{
	// Determines whether the line corresponds to a row of lines or a column of lines
	inRowOrColumn: function() {return this._type === 'horizontal'? 'rows':'columns'},

	// Register a newly created line
	register: function () {
		Line.registry[this.inRowOrColumn()][this._rowOrColumnIndex][this._lineIndex] = this;
	},

	// Marked status-related methods
	isMarked: function () {
		return this._marked;
	},

	mark: function () {
		this._marked = true;
	},

	// Position-related methods
	isVertical: function () {
		return this._type == 'vertical'
	},
	
	isHorizontal: function () {
		return this._type == 'horizontal'
	},

	isLeftOrTopBorder: function () {
		return this._rowOrColumnIndex == 0;
	},

	isRighOrBottomBorder: function () {
		return this._rowOrColumnIndex == Config.boardSize;
	},

	// Returns the box(es) which contain this line 
	getBoxes: function () {
		var boxes = [];

		if(this.isHorizontal()) {
			if(!this.isLeftOrTopBorder())
				boxes.push(Box.getByCoords(this._rowOrColumnIndex - 1,this._lineIndex));
			if(!this.isRighOrBottomBorder()) 
				boxes.push(Box.getByCoords(this._rowOrColumnIndex, this._lineIndex));
		}
		if(this.isVertical()) {
			if(!this.isLeftOrTopBorder())
				boxes.push(Box.getByCoords(this._lineIndex,this._rowOrColumnIndex - 1));
			if(!this.isRighOrBottomBorder())
				boxes.push(Box.getByCoords(this._lineIndex,this._rowOrColumnIndex));
		}
		return boxes;
	},

	// Checks if the current move closed a new box. Used to determine if the player should play a move again
	hasClosedBox: function () {
		var returnValue = false;
		var boxes = this.getBoxes();
		for(var i=0; i < boxes.length; i++) {
			if (boxes[i].calculateCompleted())
				returnValue = true;
		}
		return returnValue;
	},

	// Line templates used by the board when rendering
	getTemplate: function() {
  	return this.isVertical()? this.templateVertical : this.templateHorizontal;
  },
	templateVertical: '<div class="line vertical">',
	templateHorizontal: '<div class="line horizontal">',

});