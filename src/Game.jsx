import React, { useState } from 'react';
import Board from './Board';

export default function Game() {
const rows = 3, cols = 3
 const [history, setHistory]= useState([
    {
        squares:Array(rows).fill(null).map(() => Array(cols).fill(null))
    }
 ])
 const [stepNumber, setStepNumber] = useState(0)
 const [xisNext, setXisNext] = useState(true)
 const current = history[stepNumber]

 function handleClick(rowIndex, colIndex){
    const newHistory = history.slice(0, stepNumber + 1)
    // Create a shallow copy for each row to ensure we are not directly modifying the original current.squares array. 
    const currentBoard = current.squares.map((row) => row.slice())
    currentBoard[rowIndex][colIndex] = xisNext ? "X" : "O"
    setHistory([...newHistory, {squares:currentBoard}])
    setStepNumber(newHistory.length)
    setXisNext(!xisNext)
 }

 function jumpTo(step){
    setStepNumber(step)
    setXisNext(step % 2 === 0)
 }

 const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start"
    return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>
                {desc}
            </button>
        </li>
    )
 })

 return (
    <div className='game'>
        <div className='game-board'>
            <Board squares={current.squares} onSquareClick={(row, col) => handleClick(row, col)} />
        </div>
        <div className='game-info'>
            <ol>{moves}</ol>
        </div>
    </div>
 )

}
