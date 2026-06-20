📝 React Challenge: Notes App
Objective

Build a simple Notes application where users can create, view, and delete notes.

Functional Requirements
1. Add a Note

The user should be able to:

Type text into an input field
Click an Add Note button

The note should then appear in the notes list.

Example

Before:

[ Learn React ] [Add Note]

After clicking Add:

Learn React
2. Clear Input

After a note is added:

currentNote

should reset to:

""
3. Display Notes

Render all notes using .map().

Example:

Learn React

Build Portfolio

Apply For Jobs
4. Delete Note

Each note should have a Delete button.

Example:

Learn React      [Delete]

Build Portfolio  [Delete]

When clicked:

only that note disappears
all other notes remain
5. Empty Notes Validation

Do not allow:

""

or

"      "

to be added.

UI Requirements

No fancy styling required.

You may use:

flex
gap
border
padding

with Tailwind if you want.

Focus on React.

Suggested State

Try to think about:

const [notes, setNotes] = ?
const [currentNote, setCurrentNote] = ?

before writing code.

Ask yourself:

What is the minimum amount of state required?

Stretch Goal #1 (Recommended)

Show:

Total Notes: 3

This should update automatically.

Think:

Is this state?

or

Can this be derived?

Stretch Goal #2

Add:

[Clear All]

button.

When clicked:

notes = []
Stretch Goal #3

Allow Enter key submission.

Meaning:

Type note
↓
Press Enter
↓
Note added

without clicking the button.

Hint:

<form onSubmit={...}>
Learning Objectives

By the end you should have practiced:

useState
controlled inputs
event handlers
onChange
onSubmit
immutable state updates
array state management
.map()
.filter()
derived values
conditional rendering
CRUD thinking