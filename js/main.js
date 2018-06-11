const WIDTH = 600;
const HEIGHT = 600;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

var words = ['computer', 'byte', 'programming', 'python', 'javascript', 'nodejs', 'server', 'browser'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArrayValue(arr) {
  return arr[getRandomInt(arr.length)];
}

function Grid(columns=10, rows=10, wordlist) {
  this.grid = [];
  this.columns = columns;
  this.rows = rows;
  this.empty = 1;
  this.words = wordlist;

  this.genGrid = function() {
    let rows, grid = [];
    let i, j;

    for(i = 0; i < this.rows; i++) {
      rows = [];
      for(j = 0; j < this.columns; j++) {
        rows.push(this.empty);
      }
      this.grid.push(rows);
    }
  };

  this.printGrid = function() {
    let i;
    for(i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i]);
    }
  };

  this.checkWordinGrid = function(rows, columns, word, allign) {
    let i;

    for(i = 0; i < word.length; i++) {
      if(allign === 'columnsForward') {
        if(columns + word.length > this.columns){
          return false;
        }
        if(this.grid[rows][columns + i] != 1 && this.grid[rows][columns + i] != word[i]) {
          return false;
        }
      }
      if(allign === 'columnsBackward') {
        if(columns - word.length < 0){
          return false;
        }
        if(this.grid[rows][columns - i] != 1 && this.grid[rows][columns - i] != word[i]) {
          return false;
        }
      }
      if(allign === 'rowsForward') {
        if(rows + word.length > this.rows){
          return false;
        }
        if(this.grid[rows + i][columns] != 1 && this.grid[rows + i][columns] != word[i]) {
          return false;
        }
      }
      if(allign === 'rowsBackward') {
        if(rows - word.length < 0) {
            return false;
        }
        if(this.grid[rows - i][columns] != 1 && this.grid[rows - i][columns] != word[i]) {
          return false;
        }
      }

    }

    return true;

  };

  this.placeWordinGrid = function(rows, columns, word, allign) {
    let i;

    for(i = 0; i < word.length; i++) {
      if(allign === 'columnsForward')
        this.grid[rows][columns + i] = word[i];
      if(allign === 'columnsBackward')
        this.grid[rows][columns - i] = word[i];
      if(allign === 'rowsForward')
        this.grid[rows + i][columns] = word[i];
      if(allign === 'rowsBackward')
        this.grid[rows - i][columns] = word[i];
    }

  };

  this.placeWordsInGrid = function() {
    let i, j, randomSquare, possibles, rows, columns;
    let trys = 100;

    for(i = 0; i < this.words.length; i++) {
      for(j = 0; j < trys; j++) {
        possibles = [];
        rows = getRandomInt(this.rows);
        columns = getRandomInt(this.columns);
        randomSquare = this.grid[rows][columns];
        // checks where words could possibly go and adds them to the possibles array
        if(this.checkWordinGrid(rows, columns, this.words[i], 'columnsForward')) {
          possibles.push('columnsForward');
        }
        if(this.checkWordinGrid(rows, columns, this.words[i], 'columnsBackward')) {
          possibles.push('columnsBackward');
        }
        if(this.checkWordinGrid(rows, columns, this.words[i], 'rowsForward')) {
          possibles.push('rowsForward');
        }
        if(this.checkWordinGrid(rows, columns, this.words[i], 'rowsBackward')) {
          possibles.push('rowsBackward');
        }

        if(possibles.length > 0) {
          this.placeWordinGrid(rows, columns, this.words[i], getRandomArrayValue(possibles));
          console.log(this.words[i] + ' placed in the grid');
          break;
        }

        if(j >= 99) {
            console.log('could not fit ' + this.words[i] + ' in the grid');
        }

      }

    }
  };

  this.genRandomGrid = function() {
    var i, j;

    for(i = 0; i < this.rows; i++) {
      for(j = 0; j < this.columns; j++) {
        this.grid[i][j] = ALPHABET[getRandomInt(ALPHABET.length)];
      }
    }
  }

  this.fillGridBlanks = function() {
    let i, j;

    for(i = 0; i < this.grid.length; i++) {
      for(j = 0; j < this.grid[i].length; j++) {
          if(this.grid[i][j] === 1) {
            this.grid[i][j] = ALPHABET[getRandomInt(ALPHABET.length)];
          }
      }
    }

  };

  this.gridObject = function() {
    var grid = {};
    grid.columns = this.columns;
    grid.rows = this.rows;
    grid.grid = this.grid;

    return grid;
  }

  this.initGrid = function() {
    grid.genGrid();
    grid.placeWordsInGrid();
    grid.fillGridBlanks();
  };

  this.initRandomGrid = function() {
    grid.genGrid();
    grid.genRandomGrid();
  }

}


var RenderEngine = function(gridObject) {

  this.grid = gridObject.grid;
  this.columns = gridObject.columns;
  this.rows = gridObject.rows;
  this.fontSize = 2;
  this.renderGrid = []

  this.renderEmptyGrid = function() {
    var row, square, i, j;
    var squareWidth = Math.floor(WIDTH / this.columns - 1);
    var squareHeight = Math.floor(HEIGHT / this.rows - 1);
    var rowCount = 0;
    var colCount = 0;

    for(i = 0; i < WIDTH; i += squareWidth + 1) {
      row = [];
      colCount = 0;
      rowCount++;
      if(rowCount > this.rows) break;
      for(j = 0; j < HEIGHT; j += squareHeight + 1) {
        square = {};
        colCount++;
        if(colCount <= this.columns) {
          ctx.fillRect(j, i, squareWidth, squareHeight);
          square.x = i;
          square.y = j;
          square.width = squareWidth;
          square.height = squareHeight;
          square.value = this.grid[colCount - 1][rowCount - 1];
          row.push(square)
        }
      }
      this.renderGrid.push(row)
    }

  };

  this.genFontSize = function() {
    if (this.rows >= this.columns) this.fontSize = HEIGHT / (this.rows * 1.75);
    else this.fontSize = WIDTH / (this.columns * 1.75)
  }

  this.addWordsToGrid = function() {
    var i, j, square;
    ctx.font = this.fontSize + "px Georgia";
    ctx.fillStyle = '#fff';

    for(i = 0; i < this.rows; i++) {
      for(j = 0; j < this.columns; j++) {
        square = this.renderGrid[i][j];
        ctx.fillText(square.value, square.x + (square.width * 0.35), square.y + (square.height * 0.65));
      }
    }
  };

}

var grid = new Grid(11, 11, words);
var render = new RenderEngine(grid.gridObject());
grid.initGrid();
grid.printGrid();
render.renderEmptyGrid();
render.genFontSize();
render.addWordsToGrid();
