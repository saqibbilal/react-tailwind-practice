import { useState } from 'react';

export default function Playground() {
    const [notes, setNotes] = useState<string[]>(["I Like React", "I Like Tailwind", "I Like Typescript"]);

    const addNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(prevNotes => [...prevNotes, e.target.value]);
    }

    return (
        <div>
            <div>
                <form onSubmit={(e) => {addNote(e)}}>
                    <input type="text"/>
                    <button type="submit">Add Note</button>
                </form>
            </div>
            <div>
                {notes.map((note, index) => (
                    <div key={index}>{note}</div>
                ))}
            </div>
        </div>
    )
}


