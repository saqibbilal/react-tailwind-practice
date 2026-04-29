import { useEffect, useRef,useState } from 'react'

export function useIsFirstRender(): boolean {
  // your code here
    const firstRender = useRef(true);
    useEffect(()=>{
        firstRender.current = false;
    },[]);

    return firstRender.current;
}
export default function App() {
    const isFirstRender:boolean = useIsFirstRender();
    const [render, setRender] = useState(0);

    return (
        <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
            {/*Code here */}
            <div className="p-20 text-center">
                <h1>Is first render: { isFirstRender ? "Yes" : "No" }</h1>
                <button className="p-1 bg-gray-400 border-gray-900 rounded-lg mt-2" onClick={()=>{setRender(prev =>prev+1)}} >Re-render</button>
                <h1>Render count: {render}</h1>
            </div>
        </div>
    )
}