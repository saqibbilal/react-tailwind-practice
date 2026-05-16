# 🎴 Code Challenge: Memory Match (Concentration)

---

# 🧩 Challenge Overview

Build a web-based **Memory Card Matching Game** (also known as *Concentration*).

The game presents players with a grid of face-down cards containing hidden symbols. Each symbol appears exactly twice on the board.

The player’s objective is to uncover all matching pairs while making as few moves as possible.

This challenge is designed to test your ability to manage:

- asynchronous UI behavior
- interaction locking
- derived state
- predictable state transitions
- clean React architecture under rapid user interaction

---

# 🎮 Game Requirements

## 📌 Board Setup

- Display a fixed **4×4 grid**
- Total cards: **16**
- Total unique symbols: **8 pairs**

Every new game or reset must:

- reshuffle the cards randomly
- reset all game progress

---

# 🔄 Core Gameplay Flow

## 1️⃣ Flipping Cards

- Clicking a face-down card reveals its hidden symbol
- A player may flip **up to 2 cards per turn**

---

## 2️⃣ Matching Logic

### ✅ If the cards match:

- Both cards remain permanently face-up
- The pair is considered completed

### ❌ If the cards do NOT match:

- Both cards remain visible for **exactly 1 second**
- After the delay:
  - both cards automatically flip back face-down
  - the player regains interaction control

---

# 🛡️ Interaction Guards

Your implementation must prevent invalid user behavior.

The player should **NOT** be able to:

- click the same card twice during a turn
- click cards that are already matched
- flip a third card while a mismatch timeout is active
- bypass the game flow through rapid clicking/spamming

---

# 🏆 Win Condition

When all 8 pairs are matched:

- display a victory message:
  - `"You won!"`
- provide a:
  - **Reset / Play Again** button

Resetting the game should:

- reshuffle the board
- clear all game state

---

# 🎯 Learning Goals & Core Concepts

This challenge moves beyond static UI building and introduces **timeline-driven interfaces**, where user interactions, rendering, and asynchronous events must stay perfectly coordinated.

By completing this challenge, you will strengthen several foundational frontend engineering skills.

---

# 1️⃣ Managing Asynchronous UI State

## 🧠 The Concept

Integrating JavaScript timers (`setTimeout`) with React’s rendering lifecycle.

## 💡 What You’ll Learn

- controlling UI during async delays
- freezing interactions safely
- avoiding stale closures
- preventing race conditions from rapid clicking
- coordinating timed state transitions cleanly

---

# 2️⃣ Flat Data Modeling & State Normalization

## 🧠 The Concept

Representing cards using lightweight positional data instead of deeply mutated objects.

Example mindset:

```ts
selectedIndices = [2, 7]
matchedIndices = [1, 4, 9, 12]
```

instead of:

```ts
{
  id: 1,
  isFlipped: true,
  isMatched: false
}
```

## 💡 What You’ll Learn

- normalized state design
- reducing duplicated truth
- separating:
  - layout concerns (CSS)
  - relationship/state concerns (React)
- building predictable state structures

---

# 3️⃣ Derived UI State (Avoiding Redundant Flags)

## 🧠 The Concept

A card’s visual state should be **derived**, not stored redundantly.

Example:

```ts
const isFaceUp =
  selectedIndices.includes(index) ||
  matchedIndices.includes(index)
```

instead of storing:

```ts
isFlipped: true
```

on every card object.

## 💡 What You’ll Learn

- minimizing bug-prone state
- reducing synchronization issues
- deriving UI directly from authoritative state
- simplifying rendering logic

---

# 4️⃣ Guard Clauses & Interaction Safety

## 🧠 The Concept

Protecting your application state using early-return guard clauses.

## 💡 What You’ll Learn

How to intercept invalid actions immediately:

```ts
if (locked) return
if (matched.includes(index)) return
if (selected.includes(index)) return
```

This creates:

- safer interaction flow
- predictable state transitions
- resistance to rapid user input
- cleaner event handlers

---

# 🧪 Recommended Bonus Features (Optional)

If you finish early, consider extending the challenge with:

- move counter
- timer / stopwatch
- difficulty modes
- animations for flips
- score system
- sound effects
- best-score persistence using `localStorage`
- keyboard accessibility
- responsive mobile layout

---

# 🏁 Final Goal

A successful solution should demonstrate:

- clean React thinking
- strong state management discipline
- proper async coordination
- defensive UI programming
- predictable rendering behavior under rapid interaction

This challenge is less about visuals and more about building a **stable interactive system**.