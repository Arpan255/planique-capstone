import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ViewExpenses = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [totalExpensesSum, setTotalExpensesSum] = useState(0);
  const [remainingBudgetCalc, setRemainingBudgetCalc] = useState(0);
  
  const { totalBudget } = location.state || {};

  useEffect(() => {
    fetchExpenses();
  }, [eventId]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8222/api/expenses/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
        
        // Calculate total expenses
        const total = data.reduce((sum, expense) => sum + parseFloat(expense.totalAmount), 0);
        setTotalExpensesSum(total);
        
        // Calculate remaining budget
        const remaining = totalBudget - total;
        setRemainingBudgetCalc(remaining);
        
        // Group expenses by category
        const categoryGroups = data.reduce((groups, expense) => {
          const category = expense.expenseCategory;
          if (!groups[category]) {
            groups[category] = 0;
          }
          groups[category] += parseFloat(expense.totalAmount);
          return groups;
        }, {});

        // Convert to array format for chart
        const categoryData = Object.entries(categoryGroups).map(([name, value]) => ({
          name,
          value
        }));

        setExpensesByCategory(categoryData);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#8884d8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8">Budget Overview</h1>
        
        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Total Budget</h3>
            <p className="text-2xl font-bold text-emerald-400">${totalBudget}</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-red-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-400">${totalExpensesSum.toFixed(2)}</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Remaining Budget</h3>
            <p className="text-2xl font-bold text-blue-400">${remainingBudgetCalc.toFixed(2)}</p>
          </div>
        </div>

        {/* Expenses Chart */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">Expenses by Category</h2>
          <div className="h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">Expense Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-slate-200">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.expenseId} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="py-3 px-4">{expense.expenseDescription}</td>
                    <td className="py-3 px-4">{expense.expenseCategory}</td>
                    <td className="py-3 px-4">${parseFloat(expense.totalAmount).toFixed(2)}</td>
                    <td className="py-3 px-4">{expense.paymentStatus}</td>
                    <td className="py-3 px-4">{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpenses;