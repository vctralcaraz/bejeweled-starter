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
    Array.prototype.clearAndPush = function(el) {
      let temp = [el];
      return temp;
    }

    grid.forEach((row, i) => {
      count = 0;
      checkEmoji = '';

      row.forEach((el, j) => {
        currentLocation = {row: i, col: j};

        if(checkEmoji === '') {
          checkEmoji = el;
          popArray.push(currentLocation);
          count++;
          console.log(checkEmoji);
          console.log(popArray);
          console.log(count);
        } else if(checkEmoji === el) {

          popArray.push(currentLocation);
          count++;
          console.log(checkEmoji);
          console.log(popArray);
          console.log(count);
        } else if(checkEmoji !== el) {
          popArray.length = 0;
          popArray.push(currentLocation);
          checkEmoji = el;
          count = 1;
        }
      })
    })

    // for(let i = 0; i < grid.length; i++) {
    //   let row = grid[i];
    //   count = 0;
    //   checkEmoji = '';
    //   console.log(row)

    //   for(let j = 0; j < row.length; j++) {
    //     let el = row[j];

    //     if(checkEmoji === '') {
    //       checkEmoji = el;
    //       popArray.push({row: i, col: j});
    //       count++;
    //       console.log(popArray);
    //     } else if(checkEmoji === el) {

    //       count++;
    //       popArray.push({row: i, col: j});
    //       console.log(popArray);
    //     } else {

    //       if(count >= 3) {
    //         this._popEmojis(popArray);
    //         console.log(popArray);
    //       }

    //       checkEmoji = el;
    //       popArray.clearAndPush({row: i, col: j});
    //       count = 1;
    //       console.log(popArray);
    //     }


    //   }
    // }

    Screen.grid = this.grid;
    Screen.render();
  }

  _popEmojis(arr) {
    for(let i = 0; i < arr.length; i++) {
      this.grid[arr[i].row][arr[i].col] = ' ';
    }

    Screen.grid = this.grid;
    Screen.render();
  }

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