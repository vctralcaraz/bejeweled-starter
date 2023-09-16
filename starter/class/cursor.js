const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';
    this.selectedColor = 'cyan'

    this.selected = {};
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  setSelectedBackgroundColor() {
    Screen.setBackgroundColor(this.selected.row, this.selected.col, this.selectedColor);
  }

  resetSelectedBackgroundColor(row, col) {
    Screen.setBackgroundColor(row, col, this.gridColor);
  }

  up() {
    // Move cursor up
    if(this.row > 0) {

      if(this.col === this.selected.col && this.row === this.selected.row) {
        this.setSelectedBackgroundColor();
      } else {
        this.resetBackgroundColor();
      }
      
      this.row--;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  down() {
    // Move cursor down
    if(this.row < this.numRows - 1) {

      if(this.col === this.selected.col && this.row === this.selected.row) {
        this.setSelectedBackgroundColor();
      } else {
        this.resetBackgroundColor();
      }
      
      this.row++;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  left() {
    // Move cursor left
    if(this.col > 0) {

      if(this.col === this.selected.col && this.row === this.selected.row) {
        this.setSelectedBackgroundColor();
      } else {
        this.resetBackgroundColor();
      }
      
      this.col--;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  right() {
    // Move cursor right
    if(this.col < this.numCols - 1) {

      if(this.col === this.selected.col && this.row === this.selected.row) {
        this.setSelectedBackgroundColor();
      } else {
        this.resetBackgroundColor();
      }

      this.col++;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  select() {
    if(Object.keys(this.selected).length !== 0) {
      this.resetSelectedBackgroundColor(this.selected.row, this.selected.col);
    }
    
    this.selected = {row: this.row, col: this.col};

    this.setSelectedBackgroundColor();
    Screen.render();
  }

  clearSelected() {
    this.resetSelectedBackgroundColor(this.selected.row, this.selected.col);
    this.selected = {};
  }
}


module.exports = Cursor;