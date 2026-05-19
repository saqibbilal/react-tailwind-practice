import { useState } from "react";

const cardValues = [
    "banana",
    "cat",
    "peach",
    "apple",
    "dog",
    "fish",
    "fox",
    "frog",
];

const duplicatedCards = [...cardValues, ...cardValues];

const shuffleCards = (cards: string[]): string[] => {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[i],
        ];
    }

    return shuffled;
};

export default function MemoryMatch() {
    const [allCards, setAllCards] = useState<string[]>(
        shuffleCards(duplicatedCards)
    );

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
            const updatedSelectedCards = [
                firstIndex,
                secondIndex,
            ];

            setSelectedCards(updatedSelectedCards);

            // ✅ MATCH
            if (
                allCards[firstIndex] ===
                allCards[secondIndex]
            ) {
                setMatchedCards((prev) => [
                    ...prev,
                    firstIndex,
                    secondIndex,
                ]);

                // Clear temporary selection
                setTimeout(() => {
                    setSelectedCards([]);
                }, 300);

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

    const hasWon =
        matchedCards.length === allCards.length;

    return (
        <div>
            <h1>Memory Match</h1>

            <button onClick={resetGame}>
                Reset Game
            </button>

            {hasWon && <h2>You Won! 🎉</h2>}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4, 100px)",
                    gap: "10px",
                    marginTop: "20px",
                }}
            >
                {allCards.map((card, index) => {
                    const faceUp = isFaceUp(index);

                    return (
                        <button
                            key={index}
                            onClick={() =>
                                handleCardClick(index)
                            }
                            style={{
                                width: "100px",
                                height: "100px",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                        >
                            {faceUp ? card : "?"}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}