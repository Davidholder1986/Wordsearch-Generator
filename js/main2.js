var words = ['computer', 'byte', 'programming', 'python', 'javascript', 'nodejs', 'server', 'browser'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArrayValue(arr) {
  return arr[getRandomInt(arr.length)];
}

function Grid(width=10, height=10, wordlist) {
  this.grid = [];
  this.width = width;
  this.height = height;
  this.empty = 1;
  this.words = wordlist;

  this.genGrid = function() {
    let row, grid = [];
    let i, j;

    for(i = 0; i < this.height; i++) {
      row = [];
      for(j = 0; j < this.width; j++) {
        row.push(this.empty);
      }
      this.grid.push(row);
    }
  };

  this.printGrid = function() {
    let i;
    for(i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i]);
    }
  };

  this.checkWordinGrid = function(height, width, word, allign) {
    let i;

    for(i = 0; i < word.length; i++) {
      if(allign === 'WidthForward') {
        if(this.grid[height][width + i] != 1) {
          if(this.grid[height][width + i] != word[i]) {
            return false;
          }
        }
      }
      if(allign === 'WidthBackward') {
        if(this.grid[height][width - i] != 1) {
          if(this.grid[height][width - i] != word[i]) {
            return false;
          }
        }
      }
      if(allign === 'HeightForward') {
        if(this.grid[height + i][width] != 1) {
          if(this.grid[height + i][width] != word[i]) {
            return false;
          }
        }
      }
      if(allign === 'HeightBackward') {
        if(this.grid[height - i][width] != 1) {
          if(this.grid[height - i][width] != word[i]) {
            return false;
          }
        }
      }

    }

    return true;

  };

  this.placeWordinGrid = function(height, width, word, allign) {
    let i;

    for(i = 0; i < word.length; i++) {
      if(allign === 'WidthForward')
        this.grid[height][width + i] = word[i];
      if(allign === 'WidthBackward')
        this.grid[height][width - i] = word[i];
      if(allign === 'HeightForward')
        this.grid[height + i][width] = word[i];
      if(allign === 'HeightBackward')
        this.grid[height - i][width] = word[i];
    }

  };

  this.placeWordsInGrid = function() {
    let i, j, randomSquare, possiblez, height, width;
    let trys = 100;

    for(i = 0; i < this.words.length; i++) {
      for(j = 0; j < trys; j++) {
        possibles = [];
        height = getRandomInt(this.height);
        width = getRandomInt(this.width);
        randomSquare = this.grid[height][width];
        // checks where words could possibly go and adds them to the possibles array
        console.log(this.checkWordinGrid(height, width, this.words[i], 'WidthForward'))
        if(this.checkWordinGrid(height, width, this.words[i], 'WidthForward')) {
          possibles.push('WidthForward');
        }
        if(this.checkWordinGrid(height, width, this.words[i], 'WidthBackward')) {
          possibles.push('WidthBackward');
        }
        if(this.checkWordinGrid(height, width, this.words[i], 'HeightForward')) {
          possibles.push('HeightForward');
        }
        if(this.checkWordinGrid(height, width, this.words[i], 'HeightBackward')) {
          possibles.push('HeightBackward');
        }

        if(possibles.length > 0) {
          this.placeWordinGrid(height, width, this.words[i], getRandomArrayValue(possibles));
          break;
        }

      }

    }
  };

}

var grid = new Grid(10, 10, words);
grid.genGrid();
grid.placeWordsInGrid();
grid.printGrid();
