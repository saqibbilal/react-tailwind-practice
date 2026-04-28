import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number) :void {
    const currentCallback = useRef(callback);
    useEffect((): void => {
        currentCallback.current = callback;
    }, [callback]);

    useEffect((): (() => void) => {
        const id: number = setTimeout(()=>{currentCallback.current()}, delay);
        return (): void => clearTimeout(id);
    }, [delay]);
}
// export default function App() {
//
//     return (
//         <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
//             {/*Code here */}
//             setTimeout(callback, delay)
//         </div>
//     )
// }