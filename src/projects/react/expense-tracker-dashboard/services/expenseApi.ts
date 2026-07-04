import axios from "axios";
import type { Expense } from "../types/expense";

const API_URL = "http://localhost:3000/expenses";

export const getExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get(API_URL);

    return response.data;
};