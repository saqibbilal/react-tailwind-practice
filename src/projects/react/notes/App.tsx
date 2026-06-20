import { useState } from 'react';

export default function Notes() {
    const [notes, setNotes] = useState<string[]>(["I Like React", "I Like Tailwind", "I Like Typescript", "I Like Laravel"]);

    const addNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(prevNotes => [...prevNotes, e.target.value]);
    }

    return (
        <div>
            {notes.map((note, index) => (
                <div key={index}>{note}</div>
            ))}
        </div>
    )
}


