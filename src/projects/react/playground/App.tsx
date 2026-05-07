import { useState } from "react";

const secretWord = "SPEND"
const maxGuesses = 5;
const guessLength = 5;


export default function App(){
    const [guesses, setGuesses] = useState<string[]>([]);
    const [gameState, setGameState] = useState<string>("playing"); // playing, won, lost
    const [currentGuess, setCurrentGuess] = useState<string>("");

    const handleGuess = (e) => {
        e.preventDefault();
        const guessToSubmit = currentGuess.toUpperCase();

        if (gameState !== "playing" || guessToSubmit.length !== 5) return;
        const newGuesses:string[] = [...guesses, guessToSubmit];
        setGuesses(newGuesses);
        setCurrentGuess("");
        if(currentGuess === secretWord){
            setGameState("won");
        }else if(guesses.length === maxGuesses){
            setGameState("lost");
        }

    }

    // colorPatch
    const getBgClass = (char:string, index:number) => {
        if(char && secretWord.includes(char) && char === secretWord[index]){
            return `bg-green-500 text-white border-slate-300`;
        }else if(char && secretWord.includes(char) && char != secretWord[index]){
            return `bg-yellow-500 text-white border-slate-300`;
        }
        else if(char && !secretWord.includes(char)){
            return `bg-red-500 text-white border-slate-300`;
        }
        else{
            return ``;
        }
    }

    // 5*5 grid
    const grid:string[] = [...guesses];
    while(grid.length < maxGuesses){
        grid.push("");
    }


    return (
        <div className="bg-gray-700 max-w h-screen text-white grid place-items-center">
            <h1>Welcome to Wordle!</h1>
            <div className="grid grid-rows-5 gap-2">
                {grid.map((word, rowIndex)=>(
                    <div key={rowIndex} className="grid grid-cols-5 gap-2">
                        {[...Array(5)].map((_, colIndex)=> {
                            const char = word[colIndex] || "";
                            const isGuessed = rowIndex < guesses.length;
                            const bgClasses = isGuessed ? getBgClass(char, colIndex) : `border-slate-300`;

                            return (
                                <div key={colIndex}
                                     className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-colors duration-500 ${bgClasses}`}>
                                    { char }
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>


      {/* Status Messages */}
      <div className="h-8">
        {gameState === "won" && <h2 className="text-2xl font-bold text-green-600 animate-bounce">You've won! 🎉</h2>}
        {gameState === "lost" && <h2 className="text-2xl font-bold text-red-600">You've lost! (Word: {secretWord})</h2>}
      </div>

      {/* Input Form */}
      {gameState === "playing" && (
        <form onSubmit={handleGuess} className="flex gap-2">
          <input
            type="text"
            maxLength={guessLength}
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
    Play Again
    </button>

        </div>
    )
}