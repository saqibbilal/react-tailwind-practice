# 📝 Wordle Challenge — React Technical Notes

These notes summarize the important React, JavaScript, rendering, and UI construction concepts involved in building a simplified Wordle-style game.

The challenge itself tests:

* React fundamentals
* state management
* controlled inputs
* rendering lists/grids
* conditional rendering
* array manipulation
* UI synchronization
* component thinking
* basic game logic

---

# 1. Core React Concepts

## Controlled Inputs

### Definition

Form elements where React state acts as the **single source of truth**.

### Pattern

```jsx
<input
  value={guess}
  onChange={(e) => setGuess(e.target.value.toUpperCase())}
/>
```

### Benefits

Controlled inputs allow:

* validation
* formatting
* uppercase/lowercase normalization
* live filtering
* synchronization with state
* easier debugging

This is one of the most important frontend patterns in React.

---

## State as a Snapshot

React state behaves like a snapshot of data for a specific render cycle.

### Important Rules

### ❌ Never mutate state directly

```js
count = 5;
```

### ✅ Always use the setter

```js
setCount(5);
```

---

## Re-rendering Mental Model

Every time state changes:

```js
setState(...)
```

React:

1. updates state
2. reruns the component function
3. recalculates JSX
4. updates the DOM efficiently

---

## Why We Use `const` with State

```js
const [count, setCount] = useState(0);
```

`count` is constant for that specific render snapshot.

On the next render, React creates:

* a new snapshot
* a new `count` value
* a new component execution

This is why React feels “state-driven.”

---

# 2. Grid Construction Logic

To build a stable 5x5 Wordle board, we use:

* nested mapping
* placeholder rows
* placeholder cells
* deterministic rendering

The goal is to ensure:

* the grid always stays visually stable
* rows do not jump around
* empty cells exist before guesses are entered

---

# The “Ghost Grid” Pattern

We first ensure there are always 5 rows.

```js
const grid = [...guesses];

while (grid.length < 5) {
  grid.push("");
}
```

Example result:

```js
[
  "SPEND",
  "SLEEP",
  "",
  "",
  ""
]
```

This makes rendering simpler.

---

# JSX Grid Rendering Structure

```jsx
{grid.map((word, rowIndex) => (
  <div key={rowIndex} className="row">
    {Array.from({ length: 5 }).map((_, colIndex) => (
      <div key={colIndex} className="cell">
        {word[colIndex] || ""}
      </div>
    ))}
  </div>
))}
```

---

# Why `Array.from({ length: 5 })`

This creates a fixed-length iterable array:

```js
[undefined, undefined, undefined, undefined, undefined]
```

allowing us to:

* consistently render 5 cells
* map over placeholders
* build predictable UI structures

This pattern is extremely common in React/frontend work.

---

# Nested Mapping Mental Model

```jsx
rows.map(() => {
  cols.map(() => {
    // render cell
  })
})
```

Outer loop:

* rows

Inner loop:

* cells/columns

This is a very common UI construction pattern.

---

# 3. Derivative UI Logic

Instead of storing colors in state:

```js
const [colors, setColors] = useState(...)
```

we derive them dynamically during rendering.

This is cleaner and avoids:

* duplicated state
* synchronization bugs
* stale UI issues

---

# Color Translation Logic

```js
if (letter === SECRET[colIndex]) {
  color = "green";
} else if (SECRET.includes(letter)) {
  color = "yellow";
} else {
  color = "red";
}
```

---

# Important UI Rendering Concepts

## Character Access

```js
word[colIndex] || ""
```

Prevents:

* undefined values
* empty cell crashes
* rendering inconsistencies

---

## Locked Rows

```js
rowIndex < guesses.length
```

This determines whether:

* the row is finalized
* colors should be shown
* the row should stay empty

---

## Conditional Styling

Only apply colors to submitted guesses.

Example:

```jsx
className={`cell ${isSubmitted ? color : ""}`}
```

---

# 4. The “Stale State” Trap

One of the most important React concepts.

React state updates are asynchronous.

This means:

```js
setState(...)
```

does NOT instantly change the current variable.

---

# ❌ Wrong

```js
setGuesses([...guesses, newGuess]);

if (guesses.length === 5) {
  // still old value
}
```

`guesses` still contains the previous snapshot.

---

# ✅ Correct

```js
const updatedGuesses = [...guesses, newGuess];

setGuesses(updatedGuesses);

if (updatedGuesses.length === 5) {
  // correct value
}
```

---

# Better Mental Model

Think of:

```js
setState(...)
```

as:

> “schedule a future render”

—not:

> “instantly mutate this variable.”

---

# 5. JavaScript Variable Scoping & Best Practices

## Outside Component Scope

Use for:

* constants
* configuration
* static data
* utility functions

Example:

```js
const SECRET_WORD = "SPEND";
```

Benefits:

* defined once
* avoids recreation every render
* slightly more memory efficient

---

## `const`

Default choice.

Use for:

* functions
* arrays
* objects
* state variables
* derived variables
* JSX helpers

Example:

```js
const updatedGuesses = [...guesses, guess];
```

---

## `let`

Use sparingly.

Good for:

* counters
* accumulators
* traditional loops
* temporary mutable values

Example:

```js
let total = 0;
```

---

## `var`

Avoid.

Reasons:

* function-scoped
* hoisting confusion
* outdated behavior
* harder debugging

Modern React/frontend code almost never uses `var`.

---

# 6. CSS / Tailwind Best Practices

---

# Template Literal Class Names

Combine:

* static layout styles
* dynamic conditional styles

Example:

```jsx
className={`cell ${color}`}
```

or:

```jsx
className={`
  w-12 h-12 border flex items-center justify-center
  ${isCorrect ? "bg-green-500" : "bg-red-500"}
`}
```

This pattern is heavily used in React + Tailwind.

---

# Grid Layout Concepts

## Vertical Stacking

```html
grid-rows-5
```

Creates:

* 5 vertical rows

---

## Horizontal Alignment

```html
grid-cols-5
```

Creates:

* 5 horizontal columns

---

# Common Tailwind Layout Utilities

| Utility          | Purpose               |
| ---------------- | --------------------- |
| `flex`           | enable flexbox        |
| `grid`           | enable CSS grid       |
| `justify-center` | horizontal centering  |
| `items-center`   | vertical centering    |
| `gap-2`          | spacing between items |
| `border`         | cell borders          |
| `rounded`        | rounded corners       |
| `bg-green-500`   | success color         |
| `bg-yellow-500`  | warning color         |
| `bg-red-500`     | incorrect color       |

---

# 7. React ↔ Vanilla JavaScript Mental Mapping

Understanding React becomes easier when mapped back to plain JavaScript.

| React Concept         | Vanilla JS Equivalent          |
| --------------------- | ------------------------------ |
| `useState`            | variable                       |
| rerender              | manually update DOM            |
| `onClick`             | `addEventListener`             |
| component             | UI factory function            |
| props                 | function arguments             |
| controlled input      | input listener + variable sync |
| conditional rendering | `if` statements                |
| `.map()` rendering    | loops + DOM creation           |

---

# Example Comparison

## React

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
```

## Vanilla JavaScript

```js
let count = 0;

button.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});
```

React abstracts:

* state tracking
* rerendering
* DOM synchronization

---

# 8. What This Challenge Is Really Testing

This Wordle challenge mainly evaluates:

* React fundamentals
* UI rendering fluency
* state-driven thinking
* controlled inputs
* component organization
* array manipulation
* rendering consistency
* conditional styling
* problem decomposition

It is NOT testing:

* advanced algorithms
* enterprise architecture
* React internals
* performance optimization
* advanced design patterns

---

# 9. Important Engineering Insight

The biggest frontend growth usually comes from:

> repeated UI construction.

After enough repetition, patterns become instinctive:

* cards
* grids
* forms
* modals
* tables
* dashboards
* navigation
* responsive layouts
* conditional rendering

That repetition builds:

* frontend confidence
* implementation speed
* architectural intuition
* debugging skill

---

# Final Takeaway

React development is fundamentally:

> state + rendering + synchronization.

The more UI you build:

* the more natural component composition feels
* the faster layout thinking becomes
* the easier debugging gets
* the more instinctive state management becomes

And eventually you stop thinking:

> “How do I use React?”

and start thinking:

> “What is the cleanest UI architecture for this problem?”
