'use client'
import React, { useEffect, useState } from 'react'
import { UsetrackerContext } from '../context/trackerContext';
import ExpenseTable from './expenseTable';
import { IncomeChart, ExpenseChart } from './chart';


const ExpenseTracker = () => {
    const [type, setType] = useState("");
    const [category, setCategory] = useState<'food' | 'car' | 'bills' | 'education' | 'grocery' | 'shopping' | 'salary'>();
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState("");

    const { allData, trackData } = UsetrackerContext()!;

    const [income, setIncome] = useState<number>();
    const [expense, setExpense] = useState<number>();
    const [balance, setBalance] = useState<number>();

    useEffect(() => {
        const inc = allData.reduce((total, item) => {
            if (item.type === "income") {
                total += item.amount;
            }
            return total;
        }, 0);
        setIncome(inc);
        const exp = allData.reduce((total, item) => {
            if (item.type === "expense") {
                total += item.amount;
            }
            return total;
        }, 0);
        setExpense(exp);
        setBalance(Number(inc) - Number(exp));
    }, [allData]);

    return (
        <div className='flex'>
            <div className='m-2 w-1/4 h-full border-2 rounded-lg flex items-center flex-col shadow-md'>
                <div className='bg-blue-500 w-full h-4 rounded-t-lg'></div>
                <div className='p-4'>
                    <h2 className='font-semibold text-2xl text-blue-500'>Income</h2>
                </div>
                <div className=''>
                    <p className='text-green-500 text-2xl '>$ {income}</p>
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <IncomeChart />
                </div>
            </div>

            <div className='m-2 pb-3 w-1/2 h-full border-2 rounded-lg flex items-center flex-col shadow-md'>
                <div className='bg-gradient-to-r from-blue-500 via-indigo-500 via-violet-500 to-rose-600 w-full h-4 rounded-t-lg'></div>
                <div className='flex flex-col items-center mt-2'>
                    <h1 className='font-semibold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 via-violet-500 to-rose-600'>Expense Tracker</h1>
                    <p className='text-2xl text-gray-800 mt-1'>Balance</p>
                    <p className='text-green-500 text-2xl '>$ {balance}</p>
                </div>
                <div className='w-full text-center h-44 flex justify-center overflow-auto'>
                    <table className='my-2 border-y-2 w-11/12 text-lg text-center h-16'>
                        <tbody className=''>
                            {allData.map(({ type, amount, category, date }, index) => {
                                return (
                                    <ExpenseTable
                                        key={category + index}
                                        type={type}
                                        amount={amount}
                                        category={category}
                                        date={date}
                                        index={index}
                                    />
                                );
                            })}

                        </tbody>
                    </table>
                </div>

                <form method='post' onSubmit={(e) => {
                    console.log(e);
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const formValues = Object.fromEntries(formData);
                    const { type, category, amount, date } = formValues;
                    if (!type || !category || !amount || !date) {
                        alert("Please fill out all field!!");
                    }
                    if (Number(amount) <= 0) {
                        alert("Amount must be greater than zero!")
                    }
                    else {
                        const newItem = {
                            type: formData.get("type")?.toString() ?? "",
                            category: formData.get("category")?.toString() ?? "",
                            amount: Number(formData.get("amount")) ?? "",
                            date: formData.get("date")?.toString() ?? ""
                        };
                        trackData([...allData, newItem]);
                        setBalance(Number(income) - Number(expense));
                    }
                }} className='w-full'>
                    <div className='w-full flex flex-col items-center'>
                        <select name="type" id="type" className=' mt-2 border-2 rounded-lg w-10/12 h-10 p-2'
                            onChange={(e) => setType(e.target.value)}
                            value={type}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        {type === "expense" ?
                            <select name="category" id="category" className=' mt-2 border-2 rounded-lg w-10/12 h-10 p-2'
                                onChange={(e) => setCategory((e.target.value as "food" | "car" | "bills" | "education" | "grocery" | "shopping"))}
                                value={category}>
                                <option value="bills">Bills</option>
                                <option value="car">Car</option>
                                <option value="education">Education</option>
                                <option value="food">Food</option>
                                <option value="grocery">Grocery</option>
                                <option value="shopping">Shopping</option>
                            </select>
                            :
                            <select name="category" id="category" className=' mt-2 border-2 rounded-lg w-10/12 h-10 p-2'
                                onChange={(e) => setCategory((e.target.value as "salary"))}
                                value={category}>
                                <option value="salary">Salary</option>
                            </select>}

                        <input type="number" name="amount" id="amount" placeholder='Amount'
                            className='border-2 rounded-lg w-10/12 h-10 p-2 my-2'
                            onChange={(e) => setAmount(Number(e.target.value))}
                            value={amount} />
                        <input type="date" name="date" id="date" placeholder='Date'
                            className='border-2 rounded-lg w-10/12 h-10 p-2 mb-2'
                            onChange={(e) => setDate(e.target.value)}
                            value={date} />
                        <div className='w-1/3 p-1 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 via-violet-500 to-rose-600 '>
                            <button type='submit'
                                className='bg-white font-semibold rounded-md p-3 w-full text-violet-600 active:scale-95'>
                                Add New Item
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='m-2 w-1/4 h-full border-2 rounded-lg flex items-center flex-col shadow-md'>
                <div className='bg-rose-600 w-full h-4 rounded-t-lg'></div>
                <div className='p-4'>
                    <h2 className='font-semibold text-2xl text-rose-500'>Expense</h2>
                </div>
                <div className=''>
                    <p className='text-rose-500 text-2xl '>$ {expense}</p>
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <ExpenseChart />
                </div>
            </div>
        </div >
    )
}

export default ExpenseTracker