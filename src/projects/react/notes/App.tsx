import React, { useState } from 'react';

export default function Notes() {
    const [notes, setNotes] = useState<string[]>([]);
    const [currentNote, setCurrentNote] = useState("");
    const [editingNote, setEditingNote] = useState<null|number>(null);

    const addNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentNote.trim()) return;

        if (editingNote !== null) {

            const updatedNotes = [...notes];
            updatedNotes[editingNote] = currentNote;
            setNotes(updatedNotes);
            setEditingNote(null);
            setCurrentNote("");
            return;
        }

        setNotes(prevNotes => [...prevNotes, currentNote]);
        setCurrentNote("");
    }

    const deleteNote = (index: number) => {
        setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
    }

    const cancelEdit = () => {
        setEditingNote(null);
        setCurrentNote("");
    }

    const editNote = (i: number) => {
        setEditingNote(i);
        setCurrentNote(notes[i]);
    }

    return (
        <div className={`bg-gray-900 text-white flex flex-col items-center justify-center h-screen`}>
            <h1 className={`text-3xl font-bold`}>Total Notes: {notes.length} </h1>
            <div className={`flex flex-row gap-2`}>
                <form onSubmit={addNote}>
                    <input
                        className={`bg-white rounded-md m-4 text-gray-700 p-2 hover:border-gray-900`}
                        type="text"
                        value={currentNote}
                        placeholder="Add a new note"
                        onChange={(e) => {setCurrentNote(e.target.value)}}
                    />
                    <button className={`bg-blue-500 border-slate-500 rounded-md p-2`} type="submit">{editingNote !== null ? "Save Changes" : "Add Note"}</button>
                </form>
                {editingNote !== null && (<button className={`bg-gray-400 border-slate-500 rounded-md px-2 my-4.25 mx-1.5`} onClick={cancelEdit} >Cancel</button>)}
            </div>
            <div className={`flex flex-col gap-2`}>
                {notes.map((note, index) => (
                    <div key={index}> * {note}
                        <button className={`ml-6 float-end`} disabled={editingNote !== null} onClick={()=>deleteNote(index)}>Delete</button>
                        <button className={`ml-6 float-end`} onClick={()=>editNote(index)}>Edit</button>
                    </div>
                ))}
            </div>
            <div className={`flex flex-row gap-2`}>
                <button className={`bg-blue-500 border-slate-500 rounded-md p-2 m-4`} disabled={editingNote !== null} onClick={()=>setNotes([])}>Clear All</button>
            </div>
        </div>
    )
}


