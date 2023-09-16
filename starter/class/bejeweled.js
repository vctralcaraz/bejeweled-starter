const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.numRows = 8;
    this.numCols = 8;
    this.icons = ['🍇', '🍉', '🍊', '🍋', '🍍', '🍒', '🍓', '🥝', '🥥'];

    // Initialize this
    this.grid = [];

    this.initializeBoard();

    this.cursor = new Cursor(this.numRows, this.numCols);

    Screen.initialize(this.numRows, this.numCols);
    Screen.grid = this.grid;
    Screen.setGridlines(false);

    this.cursor.setBackgroundColor();

    Screen.addCommand('up', 'Move up', () => {
      this.cursor.up();
    });
    
    Screen.addCommand('right', 'Move right', () => {
      this.cursor.right();
    });
    Screen.addCommand('down', 'Move down', () => {
      this.cursor.down();
    });
    Screen.addCommand('left', 'Move left', () => {
      this.cursor.left();
    });
    Screen.addCommand('return', 'select fruit', () => {
      if(Object.keys(this.cursor.selected).length > 0) {
        this._swap({row: this.cursor.row, col: this.cursor.col}, this.cursor.selected);
        this.checkForMatches(Screen.grid);
      } else {
        this.cursor.select();
      }
    });

    Screen.render();
  }

  checkForMatches(grid) {

    // Fill this in
    this._horizontalCheck(grid);

  }

  _horizontalCheck(grid) {
    // console.log('inside horizontal check')

    let count;
    let checkEmoji;
    let popArray = [];
    let currentLocation;

    grid.forEach(function(row, i) {
      checkEmoji = '';
      count = 0;

      row.forEach(function(el, j) {
        currentLocation = {row: i, col: j};
        
        if(checkEmoji === '') {
          checkEmoji = el;
        }

        if(checkEmoji === el) {
          count++;
          popArray.push(currentLocation);
        } else {

          if(count >= 3) {
            this._popEmojis(popArray);
          }

          count = 1;
          checkEmoji = el;
          popArray = [];
          popArray.push(currentLocation);
        }

        // console.log(count);
        // console.log(popArray);
        // console.log(checkEmoji);
      });
    });

    Screen.grid = this.grid;
    Screen.render();
  }

  _popEmojis(arr) {
    console.log(arr);
    console.log(this.grid);
    for(let i = 0; i < arr.length; i++) {
      console.log(arr[i].row, arr[i].col);
      this.grid[arr[i].row][arr[i].col] = ' ';
    }

    Screen.grid = this.grid;
    Screen.render();
  }

  _popEmojis = this._popEmojis.bind(this);

  initializeBoard() {

    let lastR = null;

    for(let i = 0; i < this.numRows; i++) {
      this.grid.push([]);

      for(let j = 0; j < this.numCols; j++) {
        let r = this._getRandomIndex(lastR)
        lastR = r;

        this.grid[i][j] = this.icons[r]
      }
    }
  }

  _getRandomIndex(lastR) {
    let index = Math.floor(Math.random() * this.icons.length);

    if(index === lastR) {
      return this._getRandomIndex(lastR)
    }

    return index;
  }

  _swap(newSelect, oldSelect) {

    let oldEmoji = Screen.grid[oldSelect.row][oldSelect.col];
    let newEmoji = Screen.grid[newSelect.row][newSelect.col];

    this.grid[newSelect.row][newSelect.col] = oldEmoji;
    this.grid[oldSelect.row][oldSelect.col] = newEmoji;

    Screen.grid = this.grid;
    this.cursor.clearSelected();

    Screen.render();
  }

}

module.exports = Bejeweled;