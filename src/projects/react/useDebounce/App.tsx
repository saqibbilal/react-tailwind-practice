import { useEffect, useState } from 'react'

export function useDebounce(callback: () => void, delay: number): void {
    useEffect(() => {
        const id = setTimeout(callback, delay);
        return () => clearTimeout(id);
    }, [callback, delay]); // Re-runs (and resets) if callback or delay change
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<string[]>([]);

    // This is the callback that will be "debounced"
    // Because this function is re-created every render,
    // it triggers the 'reset' inside useDebounce.
    useDebounce(() => {
        if (searchTerm) {
            console.log("Searching for:", searchTerm);
            setResults([`Result for ${searchTerm} 1`, `Result for ${searchTerm} 2`]);
        } else {
            setResults([]);
        }
    }, 1000);

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Debouncing Search</h1>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search..."
                    className="text-gray-900 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                />

                <div className="mt-10">
                    <h2 className="text-xl text-gray-400">Search Results:</h2>
                    <ul className="mt-4">
                        {results.map((res, index) => (
                            <li key={index} className="text-green-400">{res}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}