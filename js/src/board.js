/*
	Board object - for managing the creation and rendering of the game board, 
*/

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
		this.render();
	},

	pointTemplate:'<div class="point">',
	verticalLinesRowTemplate: '<div class="display-row vert-row">',
	horizontalLinesRowTemplate: '<div class="display-row horiz-row">',

	render: function () {
		var self = this;
		var rowCounter = 0;
		$('#board').empty().off('click');
		
		$.each(Line.registry.rows, function () { 
			var vLinesRow = $(self.verticalLinesRowTemplate);
			var hLinesRow = $(self.horizontalLinesRowTemplate);

			for(var colCounter=0; colCounter <= Config.boardSize; colCounter++) {
				if(colCounter < Config.boardSize) {
					if (colCounter == 0) {
						$(self.pointTemplate).appendTo(hLinesRow);
					}
					var hLine = Line.getByCoords('rows', rowCounter, colCounter);
					$(hLine.getTemplate()).appendTo(hLinesRow).data('LineObj', hLine).addClass(hLine.isMarked()?'marked':'' );
					$(self.pointTemplate).appendTo(hLinesRow);
				}
				if(rowCounter < Config.boardSize) {
					var vLine = Line.getByCoords('columns', colCounter, rowCounter);
					
					$(vLine.getTemplate()).appendTo(vLinesRow).data('LineObj', vLine).addClass(vLine.isMarked()?'marked':'' );

					if(colCounter < Config.boardSize) {
						var box = Box.getByCoords(rowCounter,colCounter);
						$(Box.template).appendTo(vLinesRow).data('BoxObj', box).css('background-color', box.isCompleted()? box.getCompleterPlayer().colour:'');
					}
				}
			}
			$('#board').append(hLinesRow);
			$('#board').append(vLinesRow);
			rowCounter +=1;
		});
		$('#board').on('click', '.line:not(.marked)', Game.lineClicked);
	}

};
