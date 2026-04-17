import { useState } from 'react'
export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button
                data-testid="decrement-button"
                onClick={()=>setCount(count-1)}
            >
                -
            </button>

            <button
                data-testid="increment-button"
                onClick = {()=>setCount(count+1)}
            >
                +
            </button>
            <p>clicked: { count }</p>
        </div>
    )
}