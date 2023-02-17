function Board(grid) {
	var Events = typeof window !== 'undefined' ? window.Events : {emit:function(){}};
	
	this.score = 0
	this.isGameOver = false
	
	
	this.resetGrid = function() {
		this.grid = _.map(Array(4), function() {
			return _.map(Array(4), function() {
				return 0
			})
		})
	}
	
	if(grid)
		this.grid = grid
	else
		this.resetGrid()
	
	this.newGame = function(startingPositions) {
		this.resetGrid()
		if (startingPositions) {
			var self = this
			_.forEach(startingPositions, function(pos){
				self.spawn(pos[0], pos[1], pos[2])
			})
		} else {
			this.spawn()
			this.spawn()
		}
		
		this.score = 0
		Events.emit('score', this.score)
		this.isGameOver = false
	}
	
	this.lastVisited = []
		
	this.hasAnotherMove = function() {
		for(var r=0;r<4;r++) {
			for(var c=0;c<4;c++) {
				if (!this.grid[r][c]) {
					return true
				}
				var dirs = [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1]
				]
				var self = this
				if (_.some(dirs, function(dir) {
					return self.grid[r+dir[0]] &&
						self.grid[r][c] === self.grid[r+dir[0]][c+dir[1]]
				})) return true
			}
		}
		return false
	}
	
	this.sampleWithout = function(arr, exclude) {
		var result = []
		
		for(var i=0;i<arr.length;i++) {
			var cell = arr[i];
			for(var j=0;j<exclude.length;j++) {
				var exCell = exclude[j];
				if (_.isEqual(cell, exCell)) break
			}
			
			if (j === exclude.length) {
				result.push(cell)
			}
		}
		
		return _.sample(result)
	}
	
	this.spawn = function(row, col, color) {
		if (!this.hasAnotherMove()) {
			return this.endGame()
		}
		
		if(!row && !col) {
			var pos = this.randomSpawn()
			row = pos[0]
			col = pos[1]

			// fill with either the first or second colors. 90% first color, 10% second
			color = Math.random() < 0.1 ? 2 : 1
		}

		this.lastVisited.push([row, col])
		this.grid[row][col] = color
		localStorage['grid'] = JSON.stringify(this.grid) // persistence
		
		// add element to DOM
		Events.emit('spawn', {row: row, col: col, color: color})
		
		return [row, col] // used for tutorial
	}
	
	this.randomSpawn = function() {
		
		// get random empty grid cell that didn't have any blocks last time
		var emptyCells = []
		for(var r=0;r<4;r++) {
			for(var c=0;c<4;c++) {
				if(!this.grid[r][c]) {
					emptyCells.push([r,c])
				}
			}
		}
		
		if (!emptyCells.length) {
			return;
		}
		
		var target = this.sampleWithout(emptyCells, this.lastVisited)
		
		if (!target) {
			target = _.sample(emptyCells)
		}
		
		return target
	}
	
	this.endGame = function() {
		// show end game screen
		this.isGameOver = true
		Events.emit('gameOver')
	}
	
	this.move = function(dir) {
		if (this.isGameOver) return;
		if (GAME.tutorial)
			GAME.tutorial.nextStep()
		this._move(dir)
		if (!this.hasAnotherMove()) {
			return this.endGame()
		}
		if (this.lastVisited.length !== 0) {
			this.spawn()
		}
		
		// game complete
		if (_.contains(_.flatten(this.grid), 10)) {
			this.endGame()
		}
	}
	
	this._move = function(dir) {
		var keymap = {
			up: [-1, 0],
			down: [1, 0],
			left: [0, -1],
			right: [0, 1]
		}
		
		var grid = this.grid
		var diff = keymap[dir]
		var rows = _.range(0, 4)
		var cols = _.range(0, 4)
		
		if(dir === 'down') {
			rows.reverse()
		}
		if(dir === 'right') {
			cols.reverse()
		}

		this.lastVisited = []
		
		// Hack, is something has been combined, it has 0.1 added to it temporarily
		for(var r=0;r<4;r++) {
			for(var c=0;c<4;c++) {
				var row = rows[r]
				var col = cols[c]
				
				var fromRow = row
				var fromCol = col
				
				if (grid[row] && grid[row][col]) {
					var combine = grid[row][col]
					
					while (grid[row + diff[0]] && (grid[row + diff[0]][col + diff[1]] === 0 ||
								grid[row][col] === grid[row + diff[0]][col + diff[1]])) {
						
						combine = grid[row][col]
						if (grid[row][col] === grid[row + diff[0]][col + diff[1]]) {
							combine = grid[row][col] + 1 + Math.random() / 2
							this.score += Math.pow(grid[row][col] * 2, 2)
						}
						
						this.lastVisited.push([row, col])
						grid[row][col] = 0
						row += diff[0]
						col += diff[1]
						grid[row][col] = combine
						
					}
					
					Events.emit('score', this.score);
					Events.emit('move', {fromRow: fromRow, toRow: row, fromCol: fromCol, toCol: col});
					Events.emit('setColor', {row:row, col: col, color: Math.floor(combine)});
				}
			}
		}
		
		for(var r=0;r<4;r++) {
			for(var c=0;c<4;c++) {
				this.grid[r][c] = Math.floor(this.grid[r][c])
			}
		}
		localStorage['score'] = this.score
	}
}

if(typeof module !== 'undefined') {
	module.exports = Board
}
// events
(function(){var d={},c=0,a,b;this.Events={on:function(a,c,b){d[a]=d[a]||[];d[a].push({f:c,c:b})},off:function(b,e){a=d[b]||[];if(!e)return a.length=0;for(c=a.length;0<=--c;)e==a[c].f&&a.splice(c,1)},emit:function(){b=Array.apply([],arguments);a=d[b.shift()]||[];b=b[0]instanceof Array&&b[0]||b;for(c=a.length;0<=--c;)a[c].f.apply(a[c].c,b)}}})()

function $(selector, el) {
	if (!el) {el = document;}
	return el.querySelectorAll(selector);
}

var GAME = {
	board: new Board()
}

var $grid = $('.grid')[0]
Events.on('move', function(move) {
	if (move.fromRow === move.toRow && move.fromCol === move.toCol) return;
	var $tiles = $('.tile-'+move.fromRow+'-'+move.fromCol)
	var $old = $('.tile-'+move.toRow+'-'+move.toCol)[0]
	for(var i=0;i<$tiles.length;i++) {
		$tiles[i].className = $tiles[i].className.replace(/tile-\d-\d/, 'tile-'+move.toRow+'-'+move.toCol)
	}

	if ($old) {
		setTimeout(function() {
			try {
				for(var i=0;i<$tiles.length;i++) {
						$tiles[i].parentElement.removeChild($tiles[i])
				}
			} catch(e) {
			}
		}, 1000)
	}
})

Events.on('spawn', function(spawn) {
	var $div = document.createElement('div')
	var $tile = document.createElement('div')
	$tile.setAttribute('class', 'tile '+'tile-'+spawn.row+'-'+spawn.col+' tile-phase-'+(spawn.color-1))
	$div.setAttribute('class', 'tile-inner')
	$tile.appendChild($div)
	$grid.appendChild($tile)
})

var maxColor = 1
Events.on('setColor', function(elem) {
	var $tiles = $('.tile-'+elem.row+'-'+elem.col)
	try {
		for(var i=0;i<$tiles.length;i++) {
			$tiles[i].className = $tiles[i].className.replace(/tile-phase-\d/, 'tile-phase-'+(elem.color-1))
		}

		if (elem.color > maxColor) {
			maxColor = elem.color
			$progress = $('#progress-cover')[0]
			$progress.className = $progress.className.replace(/progress-\d/, 'progress-'+(maxColor-1))
		}
	} catch (e) {}
})

// super hack to prevent multiple buttons spawning end of game
var gameOverOnce = false
var postedScore = false
var postingScore = false
Events.on('gameOver', function() {
	Clay('ui.ads.page', function (err, ad) {
	  document.body.appendChild(ad.$el)
		ad.on('remove', function() { Events.emit('gameOverAdRemoved') })
	})
})

Events.on('gameOverAdRemoved', function() {
	postedScore = false
	postingScore = false
	maxColor = 0
	var $infoScreen = document.getElementById('info-screen')
	$infoScreen.className = 'show'
	$infoScreen.style.display = 'table'

	var $gameOverBox = document.getElementById('game-over-box')
	$gameOverBox.style.display = 'block'

	var $challengeButton = document.createElement('button')
	$challengeButton.innerHTML = 'Challenge a Friend'
	// Should add some sort of fastclick here... (touch first)
	$challengeButton.addEventListener('click', function() {
		Events.emit('challengeFriend')
	})

	// move the score element inside this div, we move back to it's original spot when a new game is started
	var $scoreWrapperEle = $('.bubble-wrapper')[0]
	if($scoreWrapperEle) {
		$scoreWrapperEle.style.zIndex = 10 // show above game over box. we want it below the tutorial tips at start though
		$gameOverBox.appendChild($scoreWrapperEle)
	}

	var $shareBubble = $('.share-bubble')[0]
	if($shareBubble)
		$shareBubble.style.display = 'none'

	if (!gameOverOnce) {
		var $gameOverButton = document.createElement('button')
		$gameOverButton.innerHTML = 'Play Again'
		$gameOverButton.className = 'play-again'
		// Should add some sort of fastclick here... (touch first)
		$gameOverButton.addEventListener('click', function() {
			Events.emit('restartGame')
		})

		$gameOverBox.appendChild($challengeButton)

		$gameOverBox.appendChild($gameOverButton)

		gameOverOnce = true
	}

	// move the score element inside this div, we move back to it's original spot when a new game is started
	var $scoreWrapperEle = $('.bubble-wrapper')[0]
	if($scoreWrapperEle)
		$gameOverBox.appendChild($scoreWrapperEle)

	// Reset saved game
	delete localStorage['grid']
	delete localStorage['score']
})

Events.on('challengeFriend', function() {
	var score = GAME.board.score;
	Clay('client.share.any', {
		text: 'I just scored ' + score + ' in Prism! Think you can beat my score? http://prism.clay.io'
	})
})

Events.on('restartGame', function() {
	$('.grid')[0].innerHTML = ''
	document.getElementById('progress-cover').className = 'progress-0'
	document.getElementById('info-screen').className = 'hide'

	// move the score element back to where it was before
	var $scoreWrapperEle = $('.bubble-wrapper')[0]
	if($scoreWrapperEle)
		document.body.appendChild($scoreWrapperEle)

	var $shareBubble = $('.share-bubble')[0]
	if($shareBubble)
		$shareBubble.style.display = 'inline-block'

	GAME.board.newGame()
})

$scoreEle = $('#score')[0]
Events.on('score', function(score) {
	$scoreEle.innerHTML = score;
})

// keybindings
var move = 'left';
Hammer(window, {
	drag_min_distance:5,
	drag_block_horizontal:true,
	drag_block_vertical:true
}).on("dragleft", function(e) {
	e.preventDefault()
	e.gesture.preventDefault()
	move='left'
}).on("dragright", function(e) {
	e.preventDefault()
	e.gesture.preventDefault()
	move='right'
}).on("dragup", function(e) {
	e.preventDefault()
	e.gesture.preventDefault()
	move='up'
}).on("dragdown", function(e) {
	e.preventDefault()
	e.gesture.preventDefault()
	move='down'
}).on('dragend', function(e) {
	GAME.board.move(move)
})

Mousetrap.bind(['up', 'down', 'left', 'right'], function(e) {
	e.preventDefault()
	var key = e.keyIdentifier
	if(!key) { // firefox
		switch(e.which) {
			case 40:
				key = 'Down';
				break;
			case 39:
				key = 'Right';
				break;
			case 37:
				key = 'Left';
				break;
			case 38:
				key = 'Up';
				break;
		}
	}
	GAME.board.move(key.toLowerCase())
});

// init
// Run the tutorial for first-time visitors
if (!localStorage['tutorial-shown']) {

	// row, col, color
	GAME.board.newGame([[2,1,1],[2,2,1]])
	GAME.tutorial = new Tutorial([2, 1])
	localStorage['tutorial-shown'] = 1
} else if (localStorage['grid']) { // for persistence
	var grid = JSON.parse(localStorage['grid'])
	var startingPositions = []
	for(var r=0;r<4;r++) {
		for(var c=0;c<4;c++) {
			if(grid[r][c] > 0)
				startingPositions.push([r, c, grid[r][c]])
		}
	}
	GAME.board.newGame(startingPositions)
	GAME.board.score = parseInt(localStorage['score']) || 0
	Events.emit('score', GAME.board.score)
} else {
	GAME.board.newGame()
}

Clay('ui.ads.banner', {position: 'bottom'}, function (err, ad) {
	document.body.appendChild(ad.$el)
})

Clay('client.kik.isEnabled', function(err, isEnabled) {
	if (isEnabled) {
		Clay('client.kik.browser.setOrientationLock', ['portrait'], function(err) {
			if(err)
				console.error(err)
		})

		// track messages sent
		Clay('client.kik.metrics.enableGoogleAnalytics', function(err) {
			if(err)
				console.error(err)
		})

		var $shareBubble = document.getElementById('share')

		var $share = document.createElement('a')
		$share.className = 'kik-share'
		$share.href = '#'
		$share.id = 'kik-share'
		$share.innerHTML = "<img src='images/kik-it.png'><span>share!</span></a>"
		$shareBubble.addEventListener('click', function() {
			Clay('client.share.any', {
				text: 'Come play Prism, the most addicting game around! http://prism.clay.io'
			})
		})
		$shareBubble.appendChild($share)

	} else {
		var html = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fprism.clay.io&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=405599259465424" style="border:none; overflow:hidden; width: 90px; height:21px;"></iframe>'
		html += '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="https://platform.twitter.com/widgets/tweet_button.html?url=http://prism.clay.io&via=claydotio&text=Prism%20-%202048%20without%20numbers" style="width:85px; height:20px;"></iframe>'
		document.getElementById('share').innerHTML = html
	}
})

window.addEventListener('load', function() {
	scrollTo( 0, 1 );

	// Detect old android and toss a class on <body> to use less animations
	var androidUserAgent = navigator.userAgent.match(/Android\s([0-9\.]*)/)
	if(androidUserAgent && parseInt(androidUserAgent[1], 10) < 3)
		document.body.className = 'slow'

	// webkit-clip: text doesn't work on older android, so the logo, etc.. looks screwy
	var $gameOverText = document.getElementById('game-over-text')
	var supportsWebkitBackgroundClipText = typeof $gameOverText.style.webkitBackgroundClip !== "undefined" && ( $gameOverText.style.webkitBackgroundClip = "text", $gameOverText.style.webkitBackgroundClip === "text" )
	var gameOverTextStyle = window.getComputedStyle($gameOverText)
	var supportsLinearGradient = gameOverTextStyle.getPropertyValue('background').indexOf('linear-gradient') !== -1
	if(!supportsWebkitBackgroundClipText || !supportsLinearGradient) {
		$gameOverText.style.background = 'transparent'
		$gameOverText.style.webkitTextFillColor = '#000'
		var $logoText = document.getElementById('logo-text')
		$logoText.style.background = 'transparent'
		$logoText.style.webkitTextFillColor = '#000'
	}
})

function sizing() {
	var gridWidth = window.innerWidth
	var gridHeight = window.innerHeight - $('.grid-inner')[0].offsetTop * 2 // .grid-outer padding
	var boxSize = Math.min(gridWidth, gridHeight) * 0.94 // 3% css padding
	$('.grid-background')[0].style.width = boxSize + 'px'
	$('.grid-background')[0].style.height = (boxSize - 14) + 'px' // 7px  padding
}
sizing()
$grid.style.visibility = 'visible'
$('.grid-background')[0].style.visibility = 'visible'
window.onresize = sizing

function Tutorial(spawnPos) {
	var Events = typeof window !== 'undefined' ? window.Events : {emit:function(){}};

	this.steps = [{
		message: "Swipe any direction to move tiles", // lined up next to one of the tiles we spawn
		x: ( spawnPos[1] * 25 ) + '%', // percent so it works w/ any scaling
		y: ( spawnPos[0] * 25 ) + '%',	
		position: 'absolute' // relative to grid
	}, {
		message: "Combine same-color tiles to make a new color",
		x: '35%', // percent so it works w/ any scaling
		y: '10%',	
		position: 'absolute', // relative to grid,
		noarrow: true
	}, {
		message: "Your progress is shown on this bar",
		x: '50%', // percent so it works w/ any scaling
		y: '10px',
		position: 'fixed' // relative to document		
	}, {
		message: "You win by making the full rainbow",
		x: '50%', // percent so it works w/ any scaling
		y: '10px',
		position: 'fixed' // relative to document
	}]
	
	this.currentStep = -1 // index of this.steps for the step that's being viewed

	
	this.removeCurrentTip = function() {
		var oldTip = document.getElementById('tip')
		if(oldTip)
			oldTip.parentNode.removeChild(oldTip)
	}
	
	this.nextStep = function(x, y, message) {
		this.currentStep++
		if(!this.steps[this.currentStep]) { // tutorial completed
			this.closeTutorial()
			return
		}
			
		this.removeCurrentTip()
		var $tipWrapper = document.createElement('div')
		$tipWrapper.id = 'tip'
		var x = this.steps[this.currentStep].x
		var y = this.steps[this.currentStep].y
		var noarrow = this.steps[this.currentStep].noarrow
		
		var yOrientation = y.indexOf('%') !== -1 && parseInt(y) >= 50 ? 'bottom' : 'top'
		if(yOrientation == 'bottom')
			$tipWrapper.style.bottom = ( 100 - parseInt(y) ) + '%' // so bottom of tip is never out of view
		else if(y.indexOf('%') !== -1)
			$tipWrapper.style.top = ( 25 + parseInt(y) ) + '%'
		else
			$tipWrapper.style.top = y
						
		
		var xOrientation = x.indexOf('%') !== false && parseInt(x) >= 50 ? 'right' : 'left'
		if(xOrientation == 'right')
			$tipWrapper.style.right = ( 75 - parseInt(x) ) + '%' // so bottom of tip is never out of view
		else if(x.indexOf('%') !== false)
			$tipWrapper.style.left = ( parseInt(x) ) + '%'
		else
			$tipWrapper.style.left = x
			
		$tipWrapper.style.position = this.steps[this.currentStep].position

		var $tip = document.createElement('div')
		$tip.innerHTML = this.steps[this.currentStep].message
		
		// TODO: fastclick
		var _this = this
		
		var $arrow = document.createElement( 'div' )
		var $arrowBorder = document.createElement( 'div' )
		if (noarrow) {
			$arrow.style.display = 'none';
			$arrowBorder.style.display = 'none';
		}
		if(yOrientation == 'bottom') {
			$arrow.className = 'arrow-bottom'
			$arrowBorder.className = 'arrow-bottom-border'
		}
		else {
			$arrow.className = 'arrow-top'
			$arrowBorder.className = 'arrow-top-border'			
		}
		
		$tipWrapper.appendChild($tip)
		$tipWrapper.appendChild($arrowBorder)
		$tipWrapper.appendChild($arrow)
		$('.grid-background')[0].appendChild($tipWrapper)
		Events.emit('nextStep', {})
	}
	
	this.closeTutorial = function() {
		this.removeCurrentTip()
	}
	
	// show the first step
	this.nextStep()
}

if(typeof module !== 'undefined') {
	module.exports = Tutorial
}
//# sourceMappingURL=prism.js.map