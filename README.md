# 🧠 React Hooks Cheat Sheet (Optimized)

A practical, production-focused reference for understanding **when and why** to use each React hook.

---

## 🧩 Core Hooks

| Hook | Purpose (Intent) | TypeScript Signature | When to Use (Trigger) |
|------|----------------|--------------------|----------------------|
| **useState** | Local UI State | `const [s, setS] = useState<T>(init)` | When state directly affects what is rendered (inputs, toggles, UI state). |
| **useReducer** | Structured State Machine | `const [state, dispatch] = useReducer(reducer, init)` | When state logic is complex, multi-step, or depends on previous state. |
| **useEffect** | Sync with External Systems | `useEffect(() => { ... }, [deps])` | When you need to **synchronize React with something outside React** (API calls, subscriptions, timers, DOM APIs). |
| **useRef** | Persistent Mutable Container | `const ref = useRef<T>(initial)` | When you need to store a value **without causing re-renders** or access DOM nodes. |
| **useMemo** | Cache Computed Value | `const v = useMemo(() => compute(), [deps])` | When a **heavy computation** or derived value would otherwise re-run unnecessarily. |
| **useCallback** | Stable Function Identity | `const fn = useCallback(fn, [deps])` | When passing callbacks to **memoized children** or preventing unnecessary re-renders. |
| **useContext** | Consume Shared State | `const v = useContext(Context)` | When accessing global/shared state (theme, auth, config). |

---

## ➕ Advanced Hooks

### 🧠 useLayoutEffect

| Hook | Purpose | When to Use |
|------|--------|------------|
| **useLayoutEffect** | Runs *before paint* (synchronous effect) | When you must measure or mutate DOM before the user sees it (avoid flicker). |

> 💡 **Rule of Thumb:**  
> `useEffect` → after paint  
> `useLayoutEffect` → before paint

---

### ⚡ useImperativeHandle

| Hook | Purpose | When to Use |
|------|--------|------------|
| **useImperativeHandle** | Customize what parent refs can access | When exposing controlled imperative APIs from child components. |

---

### 🚀 React 18 Performance Hooks

#### useTransition

| Purpose | When |
|--------|------|
| Mark updates as non-urgent | When UI should stay responsive during heavy updates |

```ts
const [isPending, startTransition] = useTransition()
```

---

#### useDeferredValue

| Purpose | When |
|--------|------|
| Defer updating a value | When input changes faster than expensive rendering |

---

### 🆔 useId

| Purpose | When |
|--------|------|
| Generate stable unique IDs | For SSR-safe form/input IDs |

---

# 🧠 The Hooks Revision: TypeScript Edition

---

## 1. `useState<T>`

**Purpose:** Switch visible state in the UI.

**Syntax:**
```ts
const [state, setState] = useState<T>(initialValue);
```

**Example:** Toggling a "Low Stock" badge for a bakery item.

```ts
const [isLowStock, setIsLowStock] = useState<boolean>(false);

// Usage
const toggleStock = () => setIsLowStock((prev) => !prev);

return (
  <div className={isLowStock ? "bg-red-100" : "bg-green-100"}>
    {isLowStock ? "Order Ingredients!" : "Stock OK"}
  </div>
);
```

---

## 2. `useReducer<R>`

**Purpose:** Master control panel for complex, multi-step state.

**Syntax:**
```ts
const [state, dispatch] = useReducer(reducerFn, initialState);
```

**Example:** Handling a multi-status API request (Idle, Loading, Success).

```ts
type State = { status: 'idle' | 'loading' | 'success'; data: string[] };
type Action = { type: 'START' } | { type: 'RESOLVE'; payload: string[] };

const [state, dispatch] = useReducer((state: State, action: Action): State => {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'loading' };
    case 'RESOLVE':
      return { status: 'success', data: action.payload };
    default:
      return state;
  }
}, { status: 'idle', data: [] });

// Usage
dispatch({ type: 'RESOLVE', payload: ['Croissant', 'Bagel'] });
```

---

## 3. `useEffect`

**Purpose:** Synchronize with external systems (side effects).

**Syntax:**
```ts
useEffect(() => {
  // effect
  return () => cleanup;
}, [deps]);
```

**Example:** Setting up a "Live Chat" listener.

```ts
useEffect(() => {
  const socket = connectToBakeryChat(); // External bridge

  return () => {
    socket.disconnect(); // Cleanup
  };
}, []); // Runs once on mount
```

---

## 4. `useMemo<T>`

**Purpose:** Cache expensive computations.

**Syntax:**
```ts
const value = useMemo(() => computeValue(), [deps]);
```

**Example:** Calculating total from a large orders list.

```ts
const expensiveTotal = useMemo<number>(() => {
  return orders.reduce((acc, order) => acc + order.total, 0);
}, [orders]);
```

---

## 5. `useCallback<T>`

**Purpose:** Cache function identity.

**Syntax:**
```ts
const fn = useCallback((args: T) => { ... }, [deps]);
```

**Example:** Stable delete handler for a memoized component.

```ts
const handleDelete = useCallback((id: number): void => {
  console.log(`Deleting product ${id}`);
  setProducts(prev => prev.filter(p => p.id !== id));
}, []);
```

---

## 6. `useRef<T>`

**Purpose:** Persistent container (does not trigger re-renders).

**Syntax:**
```ts
const ref = useRef<T>(initialValue);
```

**Example:** DOM access + storing timeout ID.

```ts
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

const handleSearch = () => {
  inputRef.current?.focus(); // DOM access
  timerRef.current = setTimeout(() => {}, 1000); // Store value
};
```

---

## 🧠 Mental Models (Think Like This)

### 1. 🧩 Does this affect rendering?
- ✅ YES → `useState` / `useReducer`
- ❌ NO → `useRef`

---

### 2. 🌍 Am I syncing with something outside React?
- ✅ YES → `useEffect`

---

### 3. ⚡ Am I optimizing performance?
- Value → `useMemo`
- Function → `useCallback`

---

### 4. 🏗 Is state getting complex or messy?
- ✅ YES → `useReducer`

---

## ⚠️ Common Mistakes (Interview Gold)

- ❌ Using `useEffect` for pure calculations  
- ❌ Overusing `useMemo` / `useCallback` (they add overhead!)  
- ❌ Storing derived state in `useState` instead of computing it  
- ❌ Forgetting dependency arrays  
- ❌ Using `useRef` when UI should update  
- ❌ Triggering side effects during render  

---

## 💡 Final Notes

- Prefer **clarity over premature optimization**
- Reach for **simple hooks first (`useState`)**
- Introduce complexity (**`useReducer`, memoization**) only when needed
- Think in terms of **data flow + synchronization**, not just hooks

---

