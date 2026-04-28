# 🧠 React Hooks Notes — Custom Hooks, `useState`, `useRef`, `useEffect`

---

# 1. 🔄 The Core Mental Model Shift

### Backend (Imperative)

```
Input → Logic → Output
```

* You explicitly tell the system what to do and when.

---

### Frontend (React — Declarative/Reactive)

```
State → Render → Sync (Effects)
```

* You update **state**
* React re-renders UI
* Hooks synchronize side effects automatically

---

### 🌡️ Thermostat Analogy

* You **set temperature (state)**
* You don’t manually turn on heating
* The system (React + Hooks) reacts automatically

---

# 2. 🧩 Hook Deep Dive

---

## 🔹 `useState` — UI State Driver

### Purpose:

Store data that **affects rendering**

```ts
const [count, setCount] = useState(0);
```

### Key Properties:

* Updating state → **triggers re-render**
* State is tied to a specific render ("snapshot")

---

### 🧠 Rule of Thumb:

> If the user can **see it**, it belongs in `useState`

---

## 🔹 `useRef` — The Stable "Wormhole"

### Purpose:

Persist values **across renders** WITHOUT causing re-renders

```ts
const ref = useRef<number | null>(null);
```

---

### 📦 "Cardboard Box" Analogy

* The **box stays the same**
* You can change what's inside: `ref.current`
* React does NOT care → no re-render

---

### ✅ Use Cases:

* Timer IDs (`setTimeout`, `setInterval`)
* DOM elements
* Storing latest callback/function
* Mutable values not used in UI

---

### ⚠️ Important:

* Changing `ref.current` does **NOT trigger re-render**
* Value persists between renders

---

### 🧠 Rule of Thumb:

> If the user **doesn’t see it**, but you need to remember it → `useRef`

---

## 🔹 `useEffect` — The Synchronization Layer

### Purpose:

Sync your component with **external systems**

Examples:

* Timers
* API calls
* DOM manipulation
* Event listeners

---

### 🧠 Mental Model:

> Effects run **after render** to "sync reality" with your state

---

## 📌 Dependency Array Behavior

```ts
useEffect(() => {}, []);
```

| Pattern   | Behavior                                             |
| --------- | ---------------------------------------------------- |
| `[]`      | Run once (on mount)                                  |
| `[value]` | Run when `value` changes                             |
| No array  | Run after every render ⚠️ (danger of infinite loops) |

---

### ⚠️ Infinite Loop Risk

```ts
useEffect(() => {
  setState(...);
});
```

* Runs → updates state → re-renders → runs again → 💥 infinite loop

---

## 🧹 Cleanup Function (Destructor)

```ts
useEffect(() => {
  const id = setTimeout(...);

  return () => clearTimeout(id);
}, []);
```

### Important TypeScript Rule:

* `useEffect` must return either:

  * `void` (nothing)
  * OR a **Destructor function** (`() => void`)
* ❌ It **cannot return a Promise**

👉 This is why you **should not make the effect callback `async` directly**

---

### Why cleanup matters:

* Prevent memory leaks
* Avoid duplicate timers/listeners
* Handle component unmount safely

---

### 🧠 Rule:

> If you start something → you must clean it up

---

## ⚡ `useLayoutEffect` (Sibling Hook)

### Difference:

* `useEffect` → runs **after paint** (non-blocking)
* `useLayoutEffect` → runs **before paint** (blocking)

### When to use `useLayoutEffect`:

* Measuring DOM size/position
* Avoiding visual flicker

### Example scenario:

* You measure an element and reposition it
* Using `useEffect` → causes flicker
* Using `useLayoutEffect` → prevents flicker

👉 Use sparingly — most cases should use `useEffect`

---

# 3. 🧠 The "Latest Ref" Pattern (Advanced)

### Problem: **Stale Closures**

```ts
setTimeout(() => {
  console.log(state); // ❌ might be outdated
}, 1000);
```

* Timer captures a **snapshot** of state
* Future updates are ignored

---

## ✅ Solution: Latest Ref Pattern

### Step 1: Store latest callback

```ts
const callbackRef = useRef(callback);
```

---

### Step 2: Update it every render

```ts
useEffect(() => {
  callbackRef.current = callback;
});
```

---

### Step 3: Use it inside timer

```ts
setTimeout(() => {
  callbackRef.current();
}, delay);
```

---

### 🎯 Result:

* Timer always executes **latest logic**
* No stale state bugs

---

### 🧠 Mental Model:

> Timer doesn't store your function — it stores a "pointer" to your ref

---

# 4. 🧱 Custom Hooks (Key Idea)

### What is a Custom Hook?

A function that:

* Uses React hooks internally
* Encapsulates reusable logic

---

### Example: `useTimeout`

```ts
function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
```

---

### 💡 Why this is powerful:

* Reusable
* Cleaner components
* Separates logic from UI

---

# 5. 🎯 Function Return Types (Important TypeScript Insight)

### Case A — Returns nothing

```ts
(): void
```

---

### Case B — Returns a function

```ts
(): () => void
```

---

### Example in `useEffect`:

```ts
useEffect((): () => void => {
  return () => clearTimeout(id);
});
```

---

### 🧠 Key Insight:

> It’s NOT about syntax (curly braces vs one line)
> It’s about **what is being returned**

---

### ⚠️ Extra Clarification (High Value)

* The returned function in `useEffect` is called a **Destructor**
* TypeScript enforces:

```ts
void | (() => void)
```

* ❌ Returning anything else (like a Promise) is invalid

---

# 6. 🎨 UI Techniques

---

## 🔹 Short-Circuit Rendering

```tsx
{isVisible && <Component />}
```

### Logic:

* If `false` → renders nothing
* If `true` → renders component

---

### ⚠️ The "0" Gotcha

```tsx
<div>{count && <p>Visible</p>}</div>
```

* If `count = 5` → ✅ renders `<p>`
* If `count = 0` → ❗ renders `0` (unexpected)

### Why?

* `0` is falsy in JavaScript
* BUT React will render `0` as a value

---

### ✅ Fix:

```tsx
{count > 0 && <Component />}
```

OR

```tsx
{!!count && <Component />}
```

---

## 🔹 Declarative UI

```tsx
<button disabled={isActive}>
```

### Instead of:

```js
button.disabled = true;
```

---

### 🧠 Principle:

> UI = a direct reflection of state

---

# 7. 🧠 Key Vocabulary

| Term          | Meaning                                             |
| ------------- | --------------------------------------------------- |
| Hook          | Function that taps into React features              |
| Re-render     | Component function runs again                       |
| Snapshot      | State/variables at a specific render                |
| Closure       | Function capturing variables from its creation time |
| Stale Closure | Closure holding outdated values                     |
| Unmount       | Component removed from DOM                          |
| Effect        | Side-effect synchronization                         |

---

# 8. ⚠️ Common Pitfalls

### ❌ Forgetting cleanup

→ Memory leaks, duplicate timers

---

### ❌ Wrong dependencies

→ Effects not running OR running too often

---

### ❌ Using `useRef` instead of `useState`

→ UI not updating

---

### ❌ Using `useState` for non-UI data

→ Unnecessary re-renders

---

# 9. 🚀 Pro Tips (High Value)

### ✅ Performance:

* Prefer `useRef` for non-UI values
* Avoid unnecessary state updates

---

### ✅ Clean Effects:

* Keep effects focused (one responsibility)
* Split multiple concerns into multiple effects

---

### ✅ Mental Shortcut:

> 🔹 If it affects UI → `useState`
> 🔹 If it's persistent but invisible → `useRef`
> 🔹 If it talks to outside world → `useEffect`

---

# 10. 🧠 Final Mental Model (Gold)

```
Render = Pure (no side effects)
Effects = Side effects happen here
Refs = Persistent memory without re-renders
State = Drives UI
```

---

This is the foundation of writing **clean, predictable React code**.
