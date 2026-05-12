import { useState } from 'react';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];
function checkWinner(squares) {
    for (let [a, b, c] of WINNING_COMBINATIONS) {
        // If the first square isn't empty, and matches the other two...
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Returns 'X' or 'O'
        }
    }
    return null;
}

export default function TicTacToe() {
    // Our only "Source of Truth"
    const [squares, setSquares] = useState(Array.from({length:9}).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    // Derive the winner every time the component renders
    const winner = checkWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null);

    // Logic for when a square is clicked
    const handleClick = (i) => {
        // Stop if there is a winner or square is already filled
        if (winner || isDraw || squares[i]) return;

        const nextSquares = [...squares];
        nextSquares[i] = xIsNext ? 'X' : 'O';

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>

      {/* Status Message */}
      <div className="mb-4 text-xl font-semibold">
          {winner
              ? `Winner: ${winner} 🎉`
              : isDraw
                ? "It's a Draw!"
                : `Next Player: ${xIsNext ? 'X' : 'O'}`
            }
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2 bg-slate-700 p-2 rounded-lg shadow-xl">
        {squares.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl font-black hover:bg-slate-700 transition-colors"
          >
            <span className={value === 'X' ? 'text-blue-400' : 'text-rose-400'}>
              {value}
            </span>
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}
        className="mt-8 px-6 py-2 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-all"
      >
        Reset Game
      </button>
    </div>
  );
}
