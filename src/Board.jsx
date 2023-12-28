import React from 'react';
import Square from './Squares.jsx';

export default function Board({ squares, onSquareClick }) {
  const rows = squares.length; // Number of rows
  const cols = squares[0].length; // Number of columns

  // check winners
  const directions = [
    { dx: 1, dy: 0 }, // Horizontal
    { dx: 0, dy: -1 }, // Vertical
    { dx: 1, dy: 1 }, // Diagonal
    { dx: 1, dy: -1 }, // Anti-Diagonal
  ];

  function calculateWinner(board) {
    for (let direction of directions) {
      const winner = checkDirections(board, direction);
      if (winner) return winner;
    }
    return null;
  }

  function checkDirections(board, direction) {
    const { dx, dy } = direction;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOrYSymbol = board[row][col];
        let hasWinner = true;
        for (let square = 1; square < 3; square++) {
          const newRow = row + square * dx;
          const newCol = col + square * dy;

          // check boundaries for newRow , newCol
          if (
            newRow < 0 ||
            newRow >= rows ||
            newCol < 0 ||
            newCol >= cols ||
            board[newRow][newCol] !== xOrYSymbol
          ) {
            hasWinner = false;
            break;
          }
        }
        if (hasWinner) return xOrYSymbol;
      }
    }
    return null;
  }

  function handleOnSquareClick(rowIndex, colIndex) {
    if (squares[rowIndex][colIndex] || calculateWinner(squares)) return;

    onSquareClick(rowIndex, colIndex);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    /*
     flattening the 2D array to a 1D array, filter out the empty squares from the flattened 1D array 
     and then checking the count of 'X' and 'O' symbols. 
     If the count of 'X' symbols is even, then 'O' is the winner; 
     otherwise, 'X' is the winner. 
    */
    status = `Next player: ${squares.flat().filter((val) => !val).length % 2 === 0 ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((colVal, colIndex) => (
            <Square
              key={colIndex}
              value={colVal}
              onSquareClick={() => handleOnSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
