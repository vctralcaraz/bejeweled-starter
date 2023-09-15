const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {
  let board;
  let grid;

  beforeEach(function() {
    board = new Bejeweled();
  })

  // Add tests for setting up a basic board
  it('should initialize an 8x8 board', function() {

    let noEmpties = true;
    board.grid.forEach(row => {
      row.forEach(el => {
        if(el === ' ') {
          noEmpties = false;
        }
      });
    });

    expect(noEmpties).to.be.true;
  });

  // Add tests for a valid swap that matches 3
  it('should match 3 after valid swap', function() {

    grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', '🍓', '🍓', '🍓', '🥥', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    expect(board.checkForMatches(board.grid)).to.deep.equal(grid);
  });

  // Add tests for swaps that set up combos
  it('should match 3 combo after valid swap', function() {

    grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', '🍓', '🍓', '🍓', '🥥', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', '🍓', '🍓', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    expect(board.checkForMatches(board.grid)).to.deep.equal(grid);
  });

  // Add tests to check if there are no possible valid moves
  it('should return null when no possible moves can be made', function() {

    grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', '🥥', ' ', ' ', ' '],
      [' ', ' ', ' ', '🍓', '🍓', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', '🥥', '🥥', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]

    expect(board.checkForMatches(board.grid)).to.deep.equal(null);
  });

});

