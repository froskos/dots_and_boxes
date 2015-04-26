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
	},

	// Position-related methods
	isVertical: function () {
		return this._type == 'vertical'
	},
	
	isHorizontal: function () {
		return this._type == 'horizontal'
	},

	isLeftBorder: function () {
		return this.isVertical() && this._rowOrColumnIndex == 0;
	},

	isTopBorder: function () {
		return this.isHorizontal() && this._rowOrColumnIndex == 0;
	},

	isRightBorder:function () {
		return this.isVertical() && this._rowOrColumnIndex == Config.boardSize;
	},

	isBottomBorder:function () {
		return this.isHorizontal() && this._rowOrColumnIndex == Config.boardSize;
	},

  template: function() {
  	return this.isVertical()? this.templateVertical : this.templateHorizontal;
  },
	templateVertical: $('<div class="vertical-line">'),
	templateHorizontal: $('<div class="horizontal-line">'),

	// Returns the box(es) from which this line makes part 

	getBoxes: function () {
		if (this._boxes) {
			return this._boxes;
		} 
		else {
			var a =	this.calculateBoxes();
			return a;
		}
	},

	calculateBoxes: function () {
		var boxes = [];

		if(this.isHorizontal()) {
			if(!this.isTopBorder())
				boxes.push(Box.getByCoords(this._rowOrColumnIndex - 1,this._lineIndex));
			if(!this.isBottomBorder()) 
				boxes.push(Box.getByCoords(this._rowOrColumnIndex, this._lineIndex));
		}
		if(this.isVertical()) {
			if(!this.isLeftBorder())
				boxes.push(Box.getByCoords(this._lineIndex,this._rowOrColumnIndex - 1));
			if(!this.isRightBorder())
				boxes.push(Box.getByCoords(this._lineIndex,this._rowOrColumnIndex));
		}
		this._boxes = boxes;
		return boxes;
	},

	checkIfClosedBox: function () {
		var returnValue = false;
		var boxes = this.getBoxes();
		for(var i=0; i < boxes.length; i++) {
			if (boxes[i].calculateCompleted())
				returnValue = true;
		}
		return returnValue;
	}

});