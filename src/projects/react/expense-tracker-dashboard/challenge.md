# 📊 React Interview Challenge: Expense Tracker Dashboard

## Scenario

You are building a simple dashboard for tracking personal expenses.

Users can:

* Add expenses
* Delete expenses
* See totals update automatically

No backend required.

Everything should live in React state.

---

# Functional Requirements

## 1. Expense Form

The user should be able to enter:

### Description

Examples:

```txt
Groceries
Coffee
Internet Bill
```

### Amount

Examples:

```txt
50
12
89
```

The user should then be able to click:

```txt
Add Expense
```

to add the expense to the dashboard.

---

## 2. Expense List

Display all expenses that have been added.

Example:

```txt
Groceries      $50
Coffee         $12
Internet Bill  $89
```

Each expense row should contain a:

```txt
Delete
```

button.

Clicking Delete should remove only that expense.

---

## 3. Dashboard Metrics

Display the following summary information at the top of the page.

### Total Expenses

Example:

```txt
$151
```

---

### Number of Expenses

Example:

```txt
3
```

Both values should update automatically whenever expenses are added or deleted.

---

# Validation Rules

Do not allow:

### Empty Description

```txt
""
```

or

```txt
"     "
```

---

### Invalid Amounts

Do not allow:

```txt
0
```

```txt
-5
```

```txt
NaN
```

Only positive numbers should be accepted.

---

# Data Modeling

Consider creating an Expense type:

```ts
type Expense = {
    description: string;
    amount: number;
}
```

Before writing JSX, think carefully about:

* What should be state?
* What can be derived from state?

---

# Stretch Goal #1: Edit Expense

Add the ability to edit an existing expense.

Suggested behavior:

1. User clicks Edit
2. Expense values populate the form
3. User modifies values
4. User clicks Save Changes
5. Expense updates in the list

Think about:

```ts
editingExpense
```

similar to the Notes App challenge.

---

# Stretch Goal #2: Highest Expense

Display the highest expense currently in the list.

Example:

```txt
Highest Expense:
Internet Bill ($89)
```

This should be calculated from existing data.

Do not create additional state for it.

---

# Stretch Goal #3: Budget Warning

Display a warning whenever total expenses exceed:

```txt
$1000
```

Example:

```txt
⚠ Budget Exceeded
```

Use conditional rendering.

---

# Stretch Goal #4: Categories

Add category support.

Possible categories:

```txt
Food
Bills
Entertainment
Transport
```

Updated Expense type:

```ts
type Expense = {
    description: string;
    amount: number;
    category: string;
}
```

Then display totals by category.

Example:

```txt
Food: $62
Bills: $89
Entertainment: $20
Transport: $15
```

This introduces grouping and aggregation logic.

---

# Learning Objectives

## Core React Concepts

* useState
* controlled inputs
* forms
* event handlers
* conditional rendering
* immutable updates

---

## Array Operations

* map()
* filter()
* reduce()
* find()
* sorting (optional)

---

## React Thinking

Practice identifying:

### State

Data that changes over time and must be stored.

### Actions

Operations the user can perform.

Examples:

* Add Expense
* Delete Expense
* Edit Expense

### Derived Values

Information that can be calculated from existing state.

Examples:

* Total Expenses
* Number of Expenses
* Highest Expense
* Category Totals

---

# Interview Mindset

Before writing any JSX, spend a few minutes defining:

```txt
State
Actions
Derived Values
```

For this challenge, that is the most important part.

The coding is straightforward.

The thinking is where the React learning happens.
