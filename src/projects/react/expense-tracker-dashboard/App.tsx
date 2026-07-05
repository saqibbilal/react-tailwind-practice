import { useState, useEffect } from 'react';
import type { Expense } from './types/expense.ts';
import type { ExpenseForm } from './types/expenseForm.ts';
import {getExpenses, createExpense, updateExpense, deleteExpenseById} from "./services/expenseApi";

export default function ExpenseTrackerDashboard() {
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [currentExpense, setCurrentExpense] = useState<ExpenseForm>({description: "", amount: 0,});
    const [editingId, setEditingId] = useState<number|null>(null);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const data = await getExpenses();
                setExpenseList(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadExpenses();
    }, []);

    const addExpense = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentExpense.description.trim() === "" || currentExpense.amount <= 0) {
          return;
        }

        if (editingId !== null) {
          try {
            const updatedExpense = await updateExpense(
              editingId,
              currentExpense
            );

            setExpenseList(prev =>
              prev.map(expense =>
                expense.id === updatedExpense.id
                  ? updatedExpense
                  : expense
              )
            );

            setEditingId(null);
            setCurrentExpense({
              description: "",
              amount: 0,
            });

            return;
          } catch (error) {
            console.error(error);
          }
        }
        try{
        const createdExpense:Expense = await createExpense(currentExpense);
        setExpenseList(prev => [...prev, createdExpense]);
        setCurrentExpense({description: "", amount: 0,});

        }
        catch(error){
            console.error(error);
        }
    }

    const totalExpense = expenseList.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const highestExpense = expenseList.length > 0 ? Math.max(...expenseList.map(expense => Number(expense.amount))) : 0;

    const cleanSlate = () => {
        setExpenseList([]);
        setCurrentExpense({description: "", amount: 0});
        return;
    }

    const deleteExpense = async (id: number) => {
      try {
        await deleteExpenseById(id);

        setExpenseList(prev =>
          prev.filter(expense => expense.id !== id)
        );
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

    return (
        <div>
            <div className={`flex flex-col gap-2 items-center justify-center h-screen bg-gray-900 text-white text-center`}>
                <div>
                    <h1 className={`text-3xl font-bold p-10`}>Expense Tracker Dashboard</h1>
                    <div className={`flex flex-row gap-2 mx-4 items-center justify-between`}>
                        <h1>Total Expense: {totalExpense} {totalExpense > 1000 && (<span className="text-red-500"> (Budget Exceeded!)</span>)}</h1>
                        <h1>Number of expenses: {expenseList.length}</h1>
                    </div>

                    <div>
                        <form onSubmit={addExpense}>
                            <input
                                className={`bg-white rounded-md m-4 text-gray-700 p-2 hover:border-gray-900`}
                                type="text"
                                value = {currentExpense.description}
                                placeholder="Enter expense name"
                                onChange={(e)=>{
                                    setCurrentExpense({...currentExpense, description: e.target.value});

                                }}
                            />
                            <input
                                className={`bg-white rounded-md m-4 text-gray-700 p-2 hover:border-gray-900`}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter expense amount"
                                value = {currentExpense.amount}
                                onChange = {(e)=>{setCurrentExpense({...currentExpense, amount: e.target.valueAsNumber})}}
                            />
                            <button className={`bg-blue-500 rounded-md m-4 hover:border-gray-900 p-2`} type="submit">Add Expense</button>
                        </form>
                    </div>
                </div>

                <div>
                    {expenseList.map((expenseEntry) => (

                        <li key={expenseEntry.id} className={`flex flex-row gap-4 m-2 items-center justify-between w-full font-bold text-xl`}>
                            <span>{expenseEntry.description}: ${expenseEntry.amount} {expenseEntry.amount === highestExpense && "(Higest Expenst)"}</span>
                            <span className={`text-green-400 hover:text-green-600`} onClick={()=>{editExpense(expenseEntry)}}>Edit</span>
                            <span className={`text-red-400 hover:text-red-600`} onClick={()=>{deleteExpense(expenseEntry.id)}}>Delete</span>
                        </li>

                    ))}
                </div>

                <button className={`bg-slate-500 rounded-md p-2`} onClick={cleanSlate}>Clean Slate</button>
            </div>
        </div>
    )
}