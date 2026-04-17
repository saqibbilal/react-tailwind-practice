# 02 - Blog Preview Card

## 🧠 Layout Thinking

* Used `flex` with `flex-col` since layout is vertical (1D layout)
* Centered card using:

    * `min-h-screen` → full viewport height
    * `flex items-center justify-center` → vertical + horizontal centering

## 🎯 Key Tailwind Decisions

* `max-w-xs` → constrained card width for responsiveness
* `w-full` → allows shrinking on mobile
* `shadow-[...]` → custom shadow to match design exactly
* `rounded-xl` → card border radius
* `border border-slate-900` → visible outline like design

## 🧠 Component Structure

* Outer container → layout (centering + background)
* Card container → UI box
* Inner content → image + text + author

## 🎨 Styling Notes

* Used `text-slate-500` for muted text
* Used `text-xs` and `text-sm` for hierarchy
* Hover effect on title → `hover:text-yellow-400`

## ⚠️ Challenges Faced

* Default global CSS was overriding Tailwind styles
* Had to debug why heading color wasn’t changing
* Learned importance of CSS specificity

## 🚀 Improvements (Next Time)

* Extract smaller components (e.g. Author, Tag)
* Improve accessibility (alt text, semantic tags)
* Use consistent spacing system instead of trial-and-error

## 💡 Interview Notes

### Flex vs Grid

* Used Flex because layout is single direction (vertical)
* Grid would be overkill here

### Why `max-w-xs`?

* Prevents card from stretching too much on large screens
* Keeps design consistent

### Why `public/` for assets?

* Static assets don’t need bundling
* Simpler for small UI projects

### 🧠 Interview Questions (Based on YOUR Code)
## ❓ Q1: Why use min-h-screen instead of h-screen?
✅ Answer:
min-h-screen allows content to grow beyond viewport
h-screen can cause overflow issues
## ❓ Q2: Why use max-w-xs?
✅ Answer:
Prevents layout breaking on large screens
Maintains readable line length
## ❓ Q3: Why not use button for "Learning"?
✅ Answer:
It’s not interactive
Semantic HTML improves accessibility and SEO
## ❓ Q4: Why use Flex here instead of Grid?
✅ Answer:
Layout is one-dimensional (vertical stacking)
Flex is simpler and more appropriate
## ❓ Q5: What is the benefit of gap over margins?
✅ Answer:
Cleaner layout control
avoids margin collapsing issues
consistent spacing system