import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ViewExpenses = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [totalExpensesSum, setTotalExpensesSum] = useState(0);
  const [remainingBudgetCalc, setRemainingBudgetCalc] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedVendorFilter, setSelectedVendorFilter] = useState('');
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);
  
  const { totalBudget } = location.state || {};
  const getVendorName = (vendorId) => {
    const vendor = vendors.find(v => v.vendorId === vendorId);
    return vendor ? vendor.vendorCompanyName : 'Venue';
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchVendors(); // Load vendors first
      await fetchExpenses(); // Then load expenses
    };
    
    loadData();
  }, [eventId]);

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8222/api/expenses/update/${editingExpense.expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingExpense)
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingExpense(null);
        fetchExpenses();
      } else {
        console.error("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  useEffect(() => {
    const calculateExpenses = (expensesToFilter) => {
      const filteredTotal = expensesToFilter.reduce((sum, expense) => sum + parseFloat(expense.totalAmount), 0);
      setTotalExpensesSum(filteredTotal);
      
      const categoryGroups = expensesToFilter.reduce((groups, expense) => {
        const category = expense.expenseCategory;
        if (!groups[category]) {
          groups[category] = 0;
        }
        groups[category] += parseFloat(expense.totalAmount);
        return groups;
      }, {});

      const categoryData = Object.entries(categoryGroups).map(([name, value]) => ({
        name,
        value
      }));

      setExpensesByCategory(categoryData);
    };

    if (selectedVendorFilter) {
      const filtered = expenses.filter(expense => 
        getVendorName(expense.vendorId) === selectedVendorFilter || 
        (selectedVendorFilter === 'Venue' && expense.vendorId === null) // Include expenses related to venue
      );
      setFilteredExpenses(filtered);
      calculateExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
      calculateExpenses(expenses);
    }
  }, [selectedVendorFilter, expenses, totalBudget]);

  const fetchVendors = async () => {
    try {
      const response = await fetch(`http://localhost:9094/api/vendors/vendors/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8222/api/expenses/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data);
        
        const total = data.reduce((sum, expense) => sum + parseFloat(expense.totalAmount), 0);
        setTotalExpensesSum(total);
        
        const remaining = totalBudget - total;
        setRemainingBudgetCalc(remaining);
        
        const categoryGroups = data.reduce((groups, expense) => {
          const category = expense.expenseCategory;
          if (!groups[category]) {
            groups[category] = 0;
          }
          groups[category] += parseFloat(expense.totalAmount);
          return groups;
        }, {});

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

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await fetch(`http://localhost:8222/api/expenses/delete/${expenseId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchExpenses();
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleVendorClick = (vendorId) => {
    const vendor = vendors.find(v => v.vendorId === vendorId);
    setSelectedVendor(vendor);
  };

  const handleVendorFilter = (vendorName) => {
    setSelectedVendorFilter(vendorName);
    setShowVendorDropdown(false);
  };

  const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#8884d8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">Budget Overview</h1>
          <div className="flex gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowVendorDropdown(!showVendorDropdown)}
                className="px-4 py-2 bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500 transition-colors"
              >
                {selectedVendorFilter || 'Filter by Vendor'}
              </button>
              {showVendorDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl z-10">
                  {vendors.map((vendor) => (
                    <div
                      key={vendor.vendorId}
                      onClick={() => handleVendorFilter(vendor.vendorCompanyName)}
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-slate-200"
                    >
                      {vendor.vendorCompanyName}
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setSelectedVendorFilter('Venue'); // Add Venue option
                      setShowVendorDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-slate-200"
                  >
                    Venue
                  </div>
                  <div
                    onClick={() => {
                      setSelectedVendorFilter('');
                      setShowVendorDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-red-400 border-t border-slate-700"
                  >
                    Clear Filter
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500 transition-colors"
            >
              Back to Event
            </button>
          </div>
        </div>
        
        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Total Budget</h3>
            <p className="text-2xl font-bold text-emerald-400">₹{totalBudget}</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-red-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-400">₹{totalExpensesSum}</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-slate-400 text-sm mb-2">Remaining Budget</h3>
            <p className="text-2xl font-bold text-blue-400">₹{remainingBudgetCalc}</p>
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
                <Tooltip formatter={(value) => `₹${value}`} />
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
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Vendor</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.expenseId} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="py-3 px-4">{expense.expenseDescription}</td>
                    <td className="py-3 px-4">₹{parseFloat(expense.totalAmount)}</td>
                    <td className="py-3 px-4">{expense.paymentStatus}</td>
                    <td className="py-3 px-4">{new Date(expense.expenseDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 cursor-pointer hover:text-emerald-400" 
                      onClick={() => handleVendorClick(expense.vendorId)}>
                    {getVendorName(expense.vendorId)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(expense)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.expenseId)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Expense Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Edit Expense</h3>
                <form onSubmit={handleUpdateExpense} className="space-y-4">
                  <div>
                    <label className="block text-slate-200 mb-2">Description</label>
                    <input
                      type="text"
                      value={editingExpense.expenseDescription}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        expenseDescription: e.target.value
                      })}
                      className="w-full p-2 rounded bg-slate-700 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-200 mb-2">Amount</label>
                    <input
                      type="number"
                      value={editingExpense.totalAmount}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        totalAmount: e.target.value
                      })}
                      className="w-full p-2 rounded bg-slate-700 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-200 mb-2">Payment Status</label>
                    <select
                      value={editingExpense.paymentStatus}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        paymentStatus: e.target.value
                      })}
                      className="w-full p-2 rounded bg-slate-900 text-slate-200 border border-slate-700"
                    >
                      <option value="PAID">Paid</option>
                      <option value="PENDING">Pending</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingExpense(null);
                      }}
                      className="px-4 py-2 bg-slate-600 text-slate-200 rounded hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Vendor Details Modal */}
          {selectedVendor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Vendor Details</h3>
                <div className="space-y-3">
                  <p className="text-slate-200"><span className="font-semibold">Company:</span> {selectedVendor.vendorCompanyName}</p>
                  <p className="text-slate-200"><span className="font-semibold">Service Type:</span> {selectedVendor.vendorServiceType}</p>
                  <p className="text-slate-200"><span className="font-semibold">Amount:</span> ₹{selectedVendor.vendorAmount}</p>
                  <p className="text-slate-200"><span className="font-semibold">Payment Status:</span> {selectedVendor.vendorPaymentStatus}</p>
                  <p className="text-slate-200"><span className="font-semibold">Contact:</span> {selectedVendor.vendorName}</p>
                  <p className="text-slate-200"><span className="font-semibold">Email:</span> {selectedVendor.vendorEmail}</p>
                  <p className="text-slate-200"><span className="font-semibold">Phone:</span> {selectedVendor.vendorPhone}</p>
                </div>
                <button 
                  onClick={() => setSelectedVendor(null)}
                  className="mt-6 px-4 py-2 bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExpenses;