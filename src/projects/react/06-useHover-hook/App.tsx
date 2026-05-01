import { useEffect, useRef, useState } from 'react'

export function useTimeout(callback: () => void, delay: number|null) :void {
    const currentCallback = useRef(callback);
    useEffect((): void => {
        currentCallback.current = callback;
    }, [callback]);

    useEffect((): (() => void)|void => {
        if (delay !== null) {
            const id: number = setTimeout(()=>{currentCallback.current()}, delay);
            return (): void => clearTimeout(id);
        }
    }, [delay]);
}
export default function App() {
        const [showNotification, setShowNotification] = useState(false);
        const [status, setStatus] = useState("Idle");
          // We only set the delay if showNotification is true.
          // If it's null, our hook logic (the if-statement) won't start the timer.
          useTimeout(
            () => {
              setShowNotification(false);
              setStatus("Idle");
            },
            showNotification ? 3000 : null
          );

          const triggerAction = () => {
            setStatus("Action Successful! (Disappearing in 3s...)");
            setShowNotification(true);
          };

    return (
        <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
            {/*Code here */}
            <div className="p-20 text-center">
              <h1>React Hook Test</h1>

              <button className="p-1 bg-gray-400 border-gray-900 rounded-lg mt-2" onClick={triggerAction} disabled={showNotification}>
                {showNotification ? "Processing..." : "Trigger Action"}
              </button>

              {showNotification && (
                <div className="mt-5 p-2.5 bg-green-100 text-green-900 rounded-md border border-green-200">
                  {status}
                </div>
              )}
              {!showNotification && <p className="mt-5">No active alerts.</p>}
            </div>
        </div>
    )
}