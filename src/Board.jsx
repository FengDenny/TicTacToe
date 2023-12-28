import React, { useState } from "react";
import Square from "./Squares.jsx";

export default function Board() {
  const rows = 3; // Number of rows
  const cols = 3; // Number of columns

  // Generate an empty 2D array
  const InitialBoard = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(null));
  const [board, setBoard] = useState(InitialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  // check winners
  const directions =[
    {dx:1, dy:0}, // Horizontal
    {dx:0, dy:-1}, // Vertical
    {dx:1, dy:1}, // Diagonal
    {dx:1, dy:-1}, // Anti-Diagonal
  ]

  function calculateWinner(board){
    for (let direction of directions){
      const winner = checkDirections(board, direction)
      if(winner) return winner
    }
    return null
  }

  function checkDirections(board, direction){
    const {dx, dy} = direction
    for(let row = 0; row < rows; row++){
      for(let col  = 0; col < cols; col++){
        const xOrYSymbol = board[row][col]
        let hasWinner = true
        for(let square = 1; square < 3; square++){
          const newRow = row + square * dx
          const newCol = col + square * dy

          // check boundaries for newRow , newCol
          if(newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || board[newRow][newCol] !== xOrYSymbol){
             hasWinner = false
             break
          }
        }
        if (hasWinner) return xOrYSymbol
      }
    }
    return null
  }
  

  function handleOnSquareClick(rowIndex, colIndex) {
    if (board[rowIndex][colIndex]) return;

    // create shallow copy of InitialBoard
    const nextBoard = board.slice();
    nextBoard[rowIndex][colIndex] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      {board.map((row, rowIndex) => (
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
