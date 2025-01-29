import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { usetrackerContext } from '../context/trackerContext';

function IncomeChart() {
    const { allData } = usetrackerContext()!;
    const incomeArray = allData?.filter((data) => data.type === "income");
    console.log("income", incomeArray);

    // Create an empty object to store categories and their total amounts
    const incomeTotals: { [key: string]: number } = {};

    // Loop through each income entry
    incomeArray.forEach((entry) => {
        const category = entry.category;
        const amount = entry.amount;

        // If the category exists, add to it; otherwise, create a new entry
        if (incomeTotals[category]) {
            incomeTotals[category] += amount;
        } else {
            incomeTotals[category] = amount;
        }
    });

    // Convert the object into an array for the chart
    const incomeChartData = Object.keys(incomeTotals).map((category) => {
        return {
            label: category,  // Category name
            value: incomeTotals[category],  // Total amount for that category
        };
    });

    return (
        <PieChart
            series={[
                {
                    data: incomeChartData,
                    cx: "100%", // Adjust `cx` for horizontal positioning
                    innerRadius: 40,
                    outerRadius: 80,
                },

            ]}
            height={300}
            width={200}
            slotProps={{
                legend: { direction: 'row', position: { vertical: 'top', horizontal: 'middle' } }
            }}
        />
    );
}

function ExpenseChart() {
    const { allData } = usetrackerContext()!;
    const expenseArray = allData?.filter((data) => data.type === "expense" );
    console.log("income", expenseArray);

    // Create an empty object to store categories and their total amounts
    const expenseTotals: { [key: string]: number } = {};

    // Loop through each income entry
    expenseArray.forEach((entry) => {
        const category = entry.category;
        const amount = entry.amount;

        // If the category exists, add to it; otherwise, create a new entry
        if (expenseTotals[category]) {
            expenseTotals[category] += amount;
        } else {
            expenseTotals[category] = amount;
        }
    });

    // Convert the object into an array for the chart
    const expenseChartData = Object.keys(expenseTotals).map((category) => {
        return {
            label: category,  // Category name
            value: expenseTotals[category],  // Total amount for that category
        };
    });

    return (
        <PieChart
            series={[
                {
                    data: expenseChartData,
                    cx: "100%", // Adjust `cx` for horizontal positioning
                    innerRadius: 40,
                    outerRadius: 80,
                },

            ]}
            height={300}
            width={200}
            slotProps={{
                legend: { direction: 'row', position: { vertical: 'top', horizontal: 'middle' } }
            }}
        />
    );
}

export {
    IncomeChart,
    ExpenseChart
}