import axios from "axios";
import type {Expense} from "../types/expense";
import type {ExpenseForm} from "../types/expenseForm";

const API_URL = "http://localhost:3000/expenses";

export const getExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createExpense = async (expense: ExpenseForm): Promise<Expense> => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (
  id: number,
  expense: ExpenseForm
): Promise<Expense> => {
  const response = await axios.patch(`${API_URL}/${id}`, expense);
  return response.data;
};

export const deleteExpenseById = async (
  id: number
): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
