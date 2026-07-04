import { useState } from 'react';
import type { expense } from './types/expense.ts'

export default function ExpenseTrackerDashboard() {
    const [expenseList, setExpenseList] = useState<expense[]>([{description: "Basket of apples", amount: 12.5}, {description: "Bunch of Bananas", amount: 1.5}]);
    const [currentExpense, setCurrentExpense] = useState<expense>({description: "", amount: 0});
    const [isEditing, setIsEditing] = useState<number|null>(null);

    const addExpense = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!currentExpense.description || !currentExpense.amount) return;
        if(isEditing !== null) {
            const tempExpenseList = [...expenseList];
            tempExpenseList[isEditing] = currentExpense;
            setExpenseList(tempExpenseList);
            setIsEditing(null);
            setCurrentExpense({description: "", amount: 0});
            return;
        }
        const tempExpenseList = [...expenseList, currentExpense];
        setExpenseList(tempExpenseList)
        setCurrentExpense({description: "", amount: 0});
    }

    const totalExpense = expenseList.reduce((acc, curr) => acc + curr.amount, 0);
    const highestExpense = Math.max(...expenseList.map(expense => expense.amount));

    const cleanSlate = () => {
        setExpenseList([]);
        setCurrentExpense({description: "", amount: 0});
        return;
    }

    const deleteExpense = (index:number) => {
        setExpenseList(prev =>
          prev.filter((_, i) => i !== index)
        );
    }

    const editExpense = (index:number) => {
        const tempExpenseList = [...expenseList];
        setCurrentExpense(tempExpenseList[index]);
        setIsEditing(index);
    }

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
                    {expenseList.map((expenseEntry, index) => (

                        <li key={index} className={`flex flex-row gap-4 m-2 items-center justify-between w-full font-bold text-xl`}>
                            <span>{expenseEntry.description}: ${expenseEntry.amount} {expenseEntry.amount === highestExpense && "(Higest Expenst)"}</span>
                            <span className={`text-green-400 hover:text-green-600`} onClick={()=>{editExpense(index)}}>Edit</span>
                            <span className={`text-red-400 hover:text-red-600`} onClick={()=>{deleteExpense(index)}}>Delete</span>
                        </li>

                    ))}
                </div>

                <button className={`bg-slate-500 rounded-md p-2`} onClick={cleanSlate}>Clean Slate</button>
            </div>
        </div>
    )
}