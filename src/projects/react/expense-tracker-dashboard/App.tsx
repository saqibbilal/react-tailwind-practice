import { useState } from 'react';
import type { Expense } from './types/expense';
import type { ExpenseForm } from './types/expenseForm';

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpenseById,
} from './services/expenseApi';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export default function ExpenseTrackerDashboard() {
  const queryClient = useQueryClient();

  const [currentExpense, setCurrentExpense] =
    useState<ExpenseForm>({
      description: '',
      amount: 0,
    });

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const {
    data: expenseList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  const createExpenseMutation = useMutation({
    mutationFn: createExpense,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: ({
      id,
      expense,
    }: {
      id: number;
      expense: ExpenseForm;
    }) => updateExpense(id, expense),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpenseById,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (
      currentExpense.description.trim() === '' ||
      currentExpense.amount <= 0
    ) {
      return;
    }

    try {
      if (editingId !== null) {
        await updateExpenseMutation.mutateAsync({
          id: editingId,
          expense: currentExpense,
        });

        setEditingId(null);
      } else {
        await createExpenseMutation.mutateAsync(
          currentExpense,
        );
      }

      setCurrentExpense({
        description: '',
        amount: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpenseMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const editExpense = (expense: Expense) => {
    setCurrentExpense({
      description: expense.description,
      amount: Number(expense.amount),
    });

    setEditingId(expense.id);
  };

  const totalExpense = expenseList.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0,
  );

  const highestExpense =
    expenseList.length > 0
      ? Math.max(
          ...expenseList.map(exp =>
            Number(exp.amount),
          ),
        )
      : 0;

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
        Loading expenses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-900 text-red-500 flex items-center justify-center h-screen">
        {error instanceof Error
          ? error.message
          : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Expense Tracker Dashboard
      </h1>

      <div className="flex gap-8 mb-6">
        <span>
          Total Expense: ${totalExpense}
        </span>

        <span>
          Number of Expenses:
          {expenseList.length}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8"
      >
        <input
          className="bg-white text-black p-2 rounded mr-2"
          type="text"
          value={currentExpense.description}
          placeholder="Description"
          onChange={e =>
            setCurrentExpense({
              ...currentExpense,
              description: e.target.value,
            })
          }
        />

        <input
          className="bg-white text-black p-2 rounded mr-2"
          type="number"
          value={currentExpense.amount}
          onChange={e =>
            setCurrentExpense({
              ...currentExpense,
              amount:
                e.target.valueAsNumber,
            })
          }
        />

        <button
          className="bg-blue-500 px-4 py-2 rounded"
          type="submit"
        >
          {editingId !== null
            ? 'Save Changes'
            : 'Add Expense'}
        </button>
      </form>

      <div>
        {expenseList.map(expense => (
          <li
            key={expense.id}
            className="flex gap-4 mb-2"
          >
            <span>
              {expense.description}: $
              {expense.amount}

              {Number(expense.amount) ===
                highestExpense &&
                ' (Highest Expense)'}
            </span>

            <button
              onClick={() =>
                editExpense(expense)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(expense.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}