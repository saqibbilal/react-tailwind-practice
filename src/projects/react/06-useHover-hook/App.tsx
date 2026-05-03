import { useState, useCallback, useRef } from 'react'
export function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);

  // We keep a manual reference to the node to clean up listeners
  const elementRef = useRef<T | null>(null);
  const callbackRef = useCallback((node: T | null) => {
    // 1. Clean up listeners from the previous node if it existed
    if (elementRef.current) {
      elementRef.current.removeEventListener("mouseenter", handleIn);
      elementRef.current.removeEventListener("mouseleave", handleOut);
    }

    // 2. Update the ref with the new node
    elementRef.current = node;

    // 3. Attach listeners to the new node
    if (elementRef.current) {
      elementRef.current.addEventListener("mouseenter", handleIn);
      elementRef.current.addEventListener("mouseleave", handleOut);
    }
  }, []);

  // Define handlers outside the callback to keep it clean
  const handleIn = () => setIsHovered(true);
  const handleOut = () => setIsHovered(false);
  return [callbackRef, isHovered] as const;
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