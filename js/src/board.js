var Board = {

	create: function () {
		for(var i=0; i< Config.boardSize +1; i++) {
			for(var j=0; j< Config.boardSize; j++) {
				hLine = new Line('horizontal', i, j);
				vLine = new Line('vertical', i, j);
				if(i < Config.boardSize) {
				 box = new Box(i,j);
				}
			}
		}

	},

	reset: function() {
		this.create();
	},

	render: function () {
		var self = this;
		var rowCounter = 0;
		$('#board').empty().off('click');
		
		$.each(Line.registry.rows, function () { //the choice of rows
			var verticalLinesRowTemplate = $('<div class="display-row vert-row">');
			var horizontalLinesRowTemplate = $('<div class="display-row horiz-row">');
			var pointTemplate = $('<div class="point">');
			var boxTemplate = $('<div class="box">');

			for(var colCounter=0; colCounter <= Config.boardSize; colCounter++) {
				if(colCounter < Config.boardSize) {
					if (colCounter == 0) {
						$('<div class="point">').appendTo(horizontalLinesRowTemplate);
					}
					var horizLine = Line.getByCoords('rows', rowCounter, colCounter);
					$('<div class="line horizontal">').appendTo(horizontalLinesRowTemplate).data('LineObj', horizLine).addClass(horizLine.isMarked()?'marked':'' );
					$('<div class="point">').appendTo(horizontalLinesRowTemplate);
				}
				if(rowCounter < Config.boardSize) {
					var vertLine = Line.getByCoords('columns', colCounter, rowCounter);
					$('<div class="line vertical">').appendTo(verticalLinesRowTemplate).data('LineObj', vertLine).addClass(vertLine.isMarked()?'marked':'' );
					$('<div class="box">').appendTo(verticalLinesRowTemplate).data('BoxObj', Box.getByCoords(rowCounter,colCounter));
				}
			}
			$('#board').append(horizontalLinesRowTemplate);
			$('#board').append(verticalLinesRowTemplate);
			rowCounter +=1;
		});
		$('#board').on('click', '.line', this.lineClick);
	},

	lineClick: function (event) {
		var lineObj =	$(this).data('LineObj');
		console.info(lineObj);
		if (lineObj.isMarked()) {
			return false;
		}
		else {
			lineObj.mark();
			Board.render();
		}
	},

	boardTemplate: '',
	
	initialize: function () {
		this.create(this._size)
	},

};
