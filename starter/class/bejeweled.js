const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    // this.playerTurn = "O";
    this.numRows = 8;
    this.numCols = 8;
    this.icons = ['🍇', '🍉', '🍊', '🍋', '🍍', '🍒', '🍓', '🥝', '🥥'];

    // Initialize this
    this.grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ];

    this.initializeBoard();

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
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
      this.cursor.select();
    });


    Screen.render();
  }

  static checkForMatches(grid) {

    // Fill this in

  }

  initializeBoard() {
    let lastR = null;

    for(let i = 0; i < this.numRows; i++) {
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


}

module.exports = Bejeweled;