/*
	Line constructor
*/

function Line(type, rowOrColumnIndex, lineIndex) {
	this._type = type;
	// this._rowIndex = type == 'horizontal'? rowOrColumnIndex : null;  //index of the row containing the line if it is horizontal
	this._rowOrColumnIndex = rowOrColumnIndex; //index of the column or row containing the line if it is vertical
	this._lineIndex = lineIndex; //the index of the line inside its row or column
	this._marked = false;
	//this._boxes = null;
	this.register();
}

/*
	Line 'class' methods
*/

$.extend(Line, {
	//class methods
	registry: (function() {
		var rows = new Array(Config.boardSize + 1),
		columns = new Array(Config.boardSize + 1);
		for(var i=0; i <= Config.boardSize; i++) {
			rows[i] = new Array(Config.boardSize);
			columns[i] = new Array(Config.boardSize);
		}
		return {rows:rows,columns:columns};
	})(), //this generates a Config.boardSize x Config.boardSize matrix


	getByCoords: function (rowsOrColumns, rowOrColumnIndex,lineIndex) {
		return this.registry[rowsOrColumns][rowOrColumnIndex][lineIndex];
	},

});

$.extend(Line.prototype,{
	//
	inRowOrColumn: function() {return this._type === 'horizontal'? 'rows':'columns'},

	// Register
	register: function () {
		Line.registry[this.inRowOrColumn()][this._rowOrColumnIndex][this._lineIndex] = this;
	},
	// Marked status-related methods
	isMarked: function () {
		return this._marked;
	},

	mark: function () {
		this._marked = true;
		this.checkIfClosedBox();
	},

	// Position-related methods
	isVertical: function () {
		return this._type == 'vertical'
	},
	
	isHorizontal: function () {
		return this._type == 'horizontal'
	},

	isLeftBorder: function () {
		this.isVertical() && this._columnIndex == 0;
	},

	isTopBorder: function () {
		this.isHorizontal() && this._rowIndex == 0;
	},

	isRightBorder:function () {
		this.isVertical() && this._columnIndex == Config.boardSize;
	},

	isBottomBorder:function () {
		this.isHorizontal() && this._rowIndex == Config.boardSize;
	},

  template: function() {
  	return this.isVertical()? this.templateVertical : this.templateHorizontal;
  },
	templateVertical: $('<div class="vertical-line">'),
	templateHorizontal: $('<div class="horizontal-line">'),

	// Returns the box(es) from which this line makes part 

	getBoxes: function () {
		if (this.boxes) {
			return this.boxes;
		} 
		else {
			this.calculateAndRegisterBoxes();
		}
	}

});