# 🎮 React Challenge — Tic Tac Toe

## Overview

Build a fully interactive Tic Tac Toe game using React.

This challenge is designed to strengthen your understanding of:

* React state management
* grid rendering
* turn-based logic
* derived UI
* conditional rendering
* immutable updates
* frontend problem decomposition

The goal is not just to make the game work, but to practice thinking in:

> state → render → interaction → rerender

This challenge is intentionally simple in UI complexity while being extremely valuable for React fundamentals.

---

# 📋 Challenge Requirements

Create a Tic Tac Toe game with the following functionality:

---

# 1. Game Board

Render a:

* 3x3 grid
* 9 clickable cells

Each cell can contain:

* `X`
* `O`
* or remain empty

The board should visually update immediately when a player clicks a cell.

---

# 2. Turn-Based Gameplay

The game starts with:

```txt
Player X
```

After each valid move:

* the turn switches
* X → O
* O → X

Display the current player somewhere on the screen.

Example:

```txt
Current Turn: X
```

---

# 3. Cell Click Rules

A player can:

* click an empty cell

A player CANNOT:

* overwrite an already occupied cell
* continue playing after the game ends

---

# 4. Winner Detection

The game should detect all winning conditions.

A player wins when they complete:

* 3 horizontal cells
* 3 vertical cells
* 3 diagonal cells

When a winner exists:

* display a winning message
* stop further moves

Example:

```txt
Player X Wins!
```

---

# 5. Draw Detection

If:

* all 9 cells are filled
* AND no winner exists

then display:

```txt
It's a Draw!
```

---

# 6. Reset Functionality

Include a button:

```txt
Play Again
```

that resets:

* board state
* current player
* winner state
* draw state

without refreshing the page.

---

# ⚠️ Important Constraints

## Allowed

* React hooks
* `useState`
* helper functions
* derived state
* Tailwind CSS (optional)
* plain CSS

---

## NOT Required

You do NOT need:

* animations
* local storage
* AI opponent
* minimax algorithm
* multiplayer
* backend
* database
* advanced styling

Focus on:

> clean React fundamentals.

---

# 💡 Recommended Mental Model

Before writing JSX:

Think about:

## What state exists?

Examples:

* board state
* current player
* winner state
* game status

---

## What changes?

Examples:

* cell click updates board
* turn switches
* winner gets calculated
* game locks after victory

---

## What UI derives from state?

Examples:

* cell contents
* current turn display
* winner message
* disabled interactions

---

# 🧠 Suggested Technical Approach

## Grid Rendering

Use nested mapping or array mapping.

Possible structure:

```jsx
Array.from({ length: 3 }).map(...)
```

or:

```js
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
```

---

# Example Cell Rendering Pattern

```jsx
board.map((row, rowIndex) => (
  <div key={rowIndex}>
    {row.map((cell, colIndex) => (
      <button key={colIndex}>
        {cell}
      </button>
    ))}
  </div>
))
```

---

# Winner Detection Hint

You may:

* hardcode winning combinations
* or calculate dynamically

Example winning lines:

```js
[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]
```

A helper function is recommended.

---

# ⏱️ Suggested Time Limit

Try to complete the challenge within:

```txt
45–90 minutes
```

Do NOT worry if your first implementation takes longer.

The goal is:

* thinking independently
* improving React fluency
* practicing state-driven UI

—not speed alone.

---

# 🧪 Bonus Challenges (Optional)

Only attempt these AFTER completing the core challenge.

## Bonus 1 — Highlight Winning Cells

Change the background color of the 3 winning cells.

---

## Bonus 2 — Move History

Track previous moves and allow stepping backward.

---

## Bonus 3 — Scoreboard

Track:

* X wins
* O wins
* draws

across multiple rounds.

---

## Bonus 4 — Responsive Design

Make the board look good on:

* mobile
* tablet
* desktop

---

# 📚 Learning Objectives

By completing this challenge, you should strengthen:

## React Fundamentals

* `useState`
* controlled updates
* rerendering
* derived UI
* conditional rendering
* event handling

---

## JavaScript Skills

* array mapping
* immutable updates
* helper functions
* condition checking
* nested structures

---

## Frontend Engineering Skills

* problem decomposition
* UI construction
* game state thinking
* render-cycle thinking
* interaction design
* debugging state transitions

---

# 🧠 Core React Concepts Being Reinforced

| Concept               | Usage              |
| --------------------- | ------------------ |
| state-driven UI       | board rendering    |
| `.map()` rendering    | grid generation    |
| immutable updates     | updating cells     |
| derived state         | winner detection   |
| conditional rendering | messages/game over |
| event handling        | cell clicks        |
| render cycles         | board rerendering  |

---

# Final Goal

The purpose of this challenge is NOT merely to finish a game.

The real objective is to begin thinking like a React engineer:

> define state → derive UI → handle interactions → rerender predictably.

That mindset is the foundation of modern frontend development.
