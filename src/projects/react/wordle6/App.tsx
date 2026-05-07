import { useState } from 'react';

const secretWord: string = "BANANA";
const wordLength: number = 6;
const maxTries: number = 6;
export default function Wordle6Game() {

    const [guesses, setGuesses] = useState<string[]>(["ELEVEN","BADANA"]);
    const [gameStatus, setGameStatus] = useState<string>("playing"); // playing, won, lost
    const [currentGuess, setCurrentGuess] = useState<string>("");

    const handleGuess = (e) => {
        e.preventDefault();
        console.log("Guess submitted:", currentGuess);

        if (gameStatus !== "playing" || currentGuess.length !== wordLength) return;

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);

        if (currentGuess === secretWord) {
          setGameStatus("won");
        } else if (newGuesses.length === maxTries) {
          setGameStatus("lost");
        }

        setCurrentGuess("");
    }

    const setColors:(char:string, index:number)=>string = (char:string, index:number):string => {
        // handle colors

        if(char && secretWord.includes(char.toUpperCase()) && char.toUpperCase() === secretWord[index]){
            return "bg-green-500 text-white border-slate-300";
        }
        else if(char && secretWord.includes(char.toUpperCase()) && char.toUpperCase() !== secretWord[index]){
            return "bg-yellow-500 text-white border-slate-300";
        }
        else if(char && !secretWord.includes(char.toUpperCase()) && char.toUpperCase() !== secretWord[index]){
            return "bg-red-500 text-white border-slate-300";
        }
        else{
            return "bg-white text-black border-slate-300";
        }
    }

    // 6*6 grid
    const grid:string[] = [...guesses];
    while(grid.length < maxTries){
        grid.push("");
    }


    return (
        <div className={`max-w h-screen bg-blue-300 flex flex-col gap-8 items-center justify-center`}>
            <h1>Wordle 6</h1>
            <div className={`grid grid-rows-6 gap-2`}>
                {
                    grid.map((word:string, rowIndex:number)=>(
                        <div key={rowIndex} className={`grid grid-cols-6 gap-2`}>
                            {
                                Array.from({length:6}).map((_,colIndex:number) => {
                                    const char:string = word[colIndex] || "";
                                    const isGuessed:boolean = rowIndex < guesses.length;
                                    const colorClasses:string = isGuessed ? setColors(char, colIndex) : `bg-white text-black border-slate-300`;

                                    return (
                                        <div key={colIndex}
                                        className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-colors duration-500 ${colorClasses}`}>
                                            { char}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>

        {/* Status Messages */}
          <div className="h-8">
            {gameStatus === "won" && <h2 className="text-2xl font-bold text-green-600 animate-bounce">You've won! 🎉</h2>}
            {gameStatus === "lost" && <h2 className="text-2xl font-bold text-red-600">You've lost! (Word: {secretWord})</h2>}
          </div>

            {/* Form with controlled input */}
            <form onSubmit={handleGuess} className={`flex gap-2`}>
                <input type={"text"}
                       placeholder={"Make A Guess!"}
                       value={currentGuess}
                       autoFocus
                       maxLength={wordLength}
                       onChange={(e) => {setCurrentGuess(e.target.value.toUpperCase())}}
                       className={`w-48 p-3 border-2 bg-white border-slate-300 rounded-md focus:outline-none focus:border-blue-500 text-center font-bold tracking-widest`}
                />
                <button type={"submit"} className={`px-6 py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700 transition-colors`}>Guess</button>
            </form>

            <button
                className={`px-6 py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700 transition-colors`}
                onClick = {()=>{window.location.reload()}} >
                Retry
            </button>
        </div>
    )
}