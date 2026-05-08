// wordle 4*5
import { useState } from "react";

const SECRET_WORD = "PLUM";
const WORD_LENGTH = 4;
const MAX_TRIES = 5;
export default function Wordle4Game(){
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [gameState, setGameState] = useState<string>("playing"); // won, lost, playing

    const handleGuess = (e: React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        if(gameState !== "playing" || currentGuess.length !== WORD_LENGTH){
            return;
        }

        const updatedGuesses = [...guesses, currentGuess];

        setGuesses(updatedGuesses);

        if(currentGuess === SECRET_WORD){
            setGameState("won");
        }
        if(guesses.length === MAX_TRIES){
            setGameState("lost");
        }
        setCurrentGuess("");
    }

    const setColors:(char:string, index:number)=>string = (char: string, index: number):string=>{
        if(char === SECRET_WORD[index]){
            return `bg-green-500`;
        }
        else if(SECRET_WORD.includes(char)){
            return `bg-yellow-500`;
        }
        else{
            return `bg-red-500`;
        }
    }

    const grid = [...guesses];
    while(grid.length < MAX_TRIES){
        grid.push("");
    }

    return(
        <div className={`flex flex-col gap-4 items-center justify-center h-screen`}>
            <h1>Wordle4</h1>
            {/* 4*5 grid */}
            <div className={`grid grid-rows-4 gap-2`}>
                {grid.map((word, rowIndex)=>(
                    <div key={rowIndex} className={`grid grid-cols-4 gap-2`}>
                        { Array.from({length:4}).map((_, colIndex:number)=>{
                            const char = word[colIndex] || "";
                            const isGuessed:boolean = rowIndex < guesses.length;
                            const bgColor = isGuessed ? setColors(char, colIndex) : 'bg-white';

                            return (
                                <div key={colIndex} className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-colors duration-500 ${bgColor}`}>
                                    {char}
                                </div>
                            )
                        }) }
                    </div>
                ))}
            </div>

            <div className="h-8">
                {gameState === "won" && <h2 className="text-2xl font-bold text-green-600 animate-bounce">You've won! 🎉</h2>}
                {gameState === "lost" && <h2 className="text-2xl font-bold text-red-600">You've lost! (Word: {SECRET_WORD})</h2>}
            </div>

            <form className={`flex flex-row gap-2`} onSubmit={handleGuess}>
                <input
                    type={`text`}
                    maxLength={WORD_LENGTH}
                    value={currentGuess}
                    autoFocus
                    placeholder={`Make a guess!`}
                    onChange={(e)=>setCurrentGuess(e.target.value.toUpperCase())}
                    className={`w-48 p-3 border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-center font-bold tracking-widest`}
                />
                <button className={`bg-slate-600 border-slate-800 text-white rounded-md p-4`}> Guess </button>
            </form>

            <button className={`bg-slate-600 border-slate-800 text-white rounded-md p-4`} onClick={
                () => {window.location.reload()}
            }>
                Try Again!
            </button>

        </div>
    )
}