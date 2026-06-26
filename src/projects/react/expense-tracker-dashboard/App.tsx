import { useState } from 'react';

interface expenseProps {
    Description: string;
    Amount: number;
}

export default function ExpenseTrackerDashboard() {
    const [expenseList, setExpenseList] = useState<expenseProps[]>([{Description: "Basket of apples", Amount: 12.5}, {Description: "Bunch of Bananas", Amount: 1.5}]);
    return (
        <div>
            <div className={`flex flex-col gap-2 items-center justify-center h-screen bg-gray-900 text-white text-center`}>
                <div>
                    <h1 className={`text-3xl font-bold p-10`}>Expense Tracker Dashboard</h1>
                    <div className={`flex flex-row gap-2 mx-4 items-center justify-between`}>
                        <h1>Total Expense: {expenseList.reduce((total:number, expenseEntry:expenseProps) => {
                            return total + expenseEntry.Amount;
                        },0)}</h1>
                        <h1>Number of expenses: {expenseList.length}</h1>
                    </div>

                    <div>
                        <form>
                            <input
                                className={`bg-white rounded-md m-4 text-gray-700 p-2 hover:border-gray-900`}
                                type="text"
                                placeholder="Enter expense name"
                            />
                            <input
                                className={`bg-white rounded-md m-4 text-gray-700 p-2 hover:border-gray-900`}
                                type="number"
                                placeholder="Enter expense amount"
                            />
                            <button className={`bg-blue-500 rounded-md m-4 hover:border-gray-900 p-2`} type="submit">Add Expense</button>
                        </form>
                    </div>
                </div>

                <div>
                    {expenseList.map((expenseEntry, index) => (

                        <li key={index} className={`flex flex-row gap-4 m-2 items-center justify-between w-full font-bold text-xl`}>
                            <span>{expenseEntry.Description}:{expenseEntry.Amount}</span>
                            <span>Delete</span>
                        </li>

                    ))}
                </div>

                <button className={`bg-slate-500 rounded-md p-2`}>Clean Slate</button>
            </div>
        </div>
    )
}