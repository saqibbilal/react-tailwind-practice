# 🧠 React Hook Notes — `useIsFirstRender`

---

# 1. 🎯 Objective

Identify whether the current render is:

* the **initial mount**
* or a **subsequent re-render**

---

### 💡 Use Cases:

* Showing **welcome messages**
* Running **one-time analytics**
* Skipping logic on **first render**

---

# 2. ⚙️ Implementation Logic

---

## 🧱 Core Idea

Combine:

* `useRef` → to **store state without re-rendering**
* `useEffect` → to **update after first render**

---

## 🧠 Step-by-Step Flow

### 1. Storage

```ts
const isFirst = useRef(true);
```

* Starts as `true`
* Persists across renders
* Does NOT trigger re-renders

---

### 2. Effect (runs once)

```ts
useEffect(() => {
  isFirst.current = false;
}, []);
```

---

## 🔄 Full Lifecycle Breakdown

### 🖥️ Render Phase:

* Hook returns `true`

---

### 🎨 Commit Phase:

* UI is painted

---

### ⚡ Effect Phase:

* `useEffect` runs
* Ref is updated → `false`

---

### 🔁 Future Renders:

* Hook always returns `false`

---

## ✅ Final Hook Example

```ts
function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
}
```

---

# 3. ⚠️ Boolean Rendering Trap

---

## ❌ Problem

```tsx
<h1>{isFirst}</h1>
```

👉 Renders **nothing**

---

## 🤔 Why?

In JSX, these are NOT rendered:

* `true`
* `false`
* `null`
* `undefined`

---

## ✅ Solutions

### Option 1 — Convert to string

```tsx
{isFirst.toString()}
```

---

### Option 2 — Ternary (Recommended)

```tsx
{isFirst ? "Yes" : "No"}
```

---

# 4. ⚠️ React Strict Mode Behavior

---

## 🧪 In Development Mode:

React may:

* **Mount components twice**
* Immediately unmount + remount

---

## ❗ Result:

You might observe:

* `isFirst` returning `false` even on "first load"

---

## 🧠 Why this happens:

* First (hidden) mount runs `useEffect`
* Ref is flipped to `false`
* Second mount uses updated value

---

## ✅ Important:

> This is **expected behavior** in modern React (Strict Mode)

👉 It does NOT happen in production

---

# 5. 🧠 Key Takeaway

> `useRef` = memory
> `useEffect` = timing

---

## 💡 Combined Insight:

By combining them, you:

* **Mark a moment in time** (first render)
* **Persist that knowledge forever**

---

## 🧠 Mental Model:

```txt
First render → mark it
After that → never first again
```

---

This pattern is simple, but extremely powerful for **controlling when logic runs in React**.
