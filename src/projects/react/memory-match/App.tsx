import { useState } from "react";

// const cardValues:string[] = ["banana", "cat", "peach", "apple", "dog", "fish", "fox", "frog"];

const cardValues = ['🍎', '🍌', '🍇', '🍊', '🍒', '🍉', '🍍', '🥝'];

const duplicatedCards: string[] = [...cardValues, ...cardValues];

const shuffleCards = (cards: string[]): string[] => {
    const shuffled:string[] = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i],];
    }
    return shuffled;
};

export default function MemoryMatch() {
    const [allCards, setAllCards] = useState<string[]>(shuffleCards(duplicatedCards));

    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [isLocked, setIsLocked] = useState<boolean>(false);

    const isFaceUp = (index: number): boolean => {
        return (
            selectedCards.includes(index) ||
            matchedCards.includes(index)
        );
    };

    const handleCardClick = (index: number): void => {
        // 🚫 Prevent interaction during timeout
        if (isLocked) return;

        // 🚫 Prevent clicking already visible cards
        if (isFaceUp(index)) return;

        // -----------------------------
        // FIRST CARD SELECTION
        // -----------------------------
        if (selectedCards.length === 0) {
            setSelectedCards([index]);
            return;
        }

        // -----------------------------
        // SECOND CARD SELECTION
        // -----------------------------
        if (selectedCards.length === 1) {
            const firstIndex = selectedCards[0];
            const secondIndex = index;

            // Temporarily show both cards
            const updatedSelectedCards = [firstIndex, secondIndex];

            setSelectedCards(updatedSelectedCards);

            // ✅ MATCH
            if (allCards[firstIndex] === allCards[secondIndex]) {
                setMatchedCards((prev) => [
                    ...prev,
                    firstIndex,
                    secondIndex,
                ]);

                // Clear temporary selection
                setSelectedCards([]);
                return;
            }

            // ❌ NOT A MATCH
            setIsLocked(true);

            setTimeout(() => {
                setSelectedCards([]);
                setIsLocked(false);
            }, 1000);
        }
    };

    const resetGame = (): void => {
        setAllCards(shuffleCards(duplicatedCards));
        setSelectedCards([]);
        setMatchedCards([]);
        setIsLocked(false);
    };

    const hasWon = matchedCards.length === allCards.length;

    return (
        <div className={`flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-800 text-white`}>
            <h1>Memory Match</h1>
            <button onClick={resetGame}>
                Reset Game
            </button>

            {hasWon && <h2>You Won! 🎉</h2>}

            <div className={`grid grid-cols-4 gap-2`}>
                {allCards.map((card, index) => {
                    const faceUp = isFaceUp(index);

                    return (
                        <button
                            key={index}
                            className="w-24 h-24 text-lg cursor-pointer"
                            onClick={() => handleCardClick(index)}
                        >
                            {faceUp ? card : "?"}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}