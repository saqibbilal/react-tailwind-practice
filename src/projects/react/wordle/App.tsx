import { useState } from 'react';

const SECRET_WORD = "SPEND";
const MAX_GUESSES = 5;

export default function WordleGame() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");

  const handleSubmit = (e) => {
    e.preventDefault();
    const guessToSubmit = currentGuess.toUpperCase();

    if (gameStatus !== "playing" || guessToSubmit.length !== 5) return;

    const newGuesses = [...guesses, guessToSubmit];
    setGuesses(newGuesses);

    if (guessToSubmit === SECRET_WORD) {
      setGameStatus("won");
    } else if (newGuesses.length === MAX_GUESSES) {
      setGameStatus("lost");
    }

    setCurrentGuess("");
  };

  const getBgClass = (char:string, index:number) => {
    if (!char) return 'bg-white';
    const upperChar = char.toUpperCase();

    if (upperChar === SECRET_WORD[index]) {
      return 'bg-green-500 text-white border-green-600';
    } else if (SECRET_WORD.includes(upperChar)) {
      return 'bg-yellow-500 text-white border-yellow-600';
    } else {
      return 'bg-red-500 text-white border-red-600';
    }
  };

  const grid:string[] = [...guesses];
  while (grid.length < MAX_GUESSES) {
    grid.push("");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 font-sans p-4">
      <h1 className="text-4xl font-black tracking-tighter text-slate-800">WORDLE LITE</h1>

      {/* 5x5 Grid */}
      <div className="grid grid-rows-5 gap-2">
        {grid.map((word, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, colIndex) => {
              const char = word[colIndex] || "";
              const isGuessed = rowIndex < guesses.length;
              const colorClasses = isGuessed ? getBgClass(char, colIndex) : 'bg-white text-black border-slate-300';

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-colors duration-500 ${colorClasses}`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Status Messages */}
      <div className="h-8">
        {gameStatus === "won" && <h2 className="text-2xl font-bold text-green-600 animate-bounce">You've won! 🎉</h2>}
        {gameStatus === "lost" && <h2 className="text-2xl font-bold text-red-600">You've lost! (Word: {SECRET_WORD})</h2>}
      </div>

      {/* Input Form */}
      {gameStatus === "playing" && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            maxLength={5}
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            placeholder="TYPE GUESS"
            autoFocus
            className="w-48 p-3 border-2 border-slate-300 rounded-md focus:outline-none focus:border-blue-500 text-center font-bold tracking-widest"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700 transition-colors"
          >
            GUESS
          </button>
        </form>
      )}
      <button
          className="px-6 py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700 transition-colors"
          onClick={() => {
            window.location.reload();
          }}>
        RETRY
      </button>
    </div>
  );
}