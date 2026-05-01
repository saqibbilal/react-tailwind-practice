import { useEffect, useState, useRef } from 'react'

export function useHover<T extends HTMLElement>() {
    const [isHovered, setIsHovered] = useState(false);
    // Initialize with null for better TS compatibility
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const node = elementRef.current;
        if (!node) return;

        const handleIn = () => setIsHovered(true);
        const handleOut = () => setIsHovered(false);

        node.addEventListener("mouseenter", handleIn);
        node.addEventListener("mouseleave", handleOut);

        // Clean up the "Subscription"
        return () => {
            node.removeEventListener("mouseenter", handleIn);
            node.removeEventListener("mouseleave", handleOut);
        }
    }, []);

    return [elementRef, isHovered] as const;
    // Note: 'as const' helps TypeScript understand this is a fixed-size array
}

export default function App() {
    const [myRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen">
            <div
                ref={myRef}
                className={`transition-colors duration-300 p-10 rounded-2xl cursor-pointer text-2xl font-bold ${
                    isHovered ? 'bg-purple-600 scale-110' : 'bg-purple-400'
                }`}
            >
                {isHovered ? "RE-RENDER! 🚀" : "Hover Me!"}
            </div>
        </div>
    )
}