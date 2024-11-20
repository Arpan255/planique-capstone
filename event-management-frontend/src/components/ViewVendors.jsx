import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function ViewVendors() {
    const [vendors, setVendors] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchVendors();
        fetchExpenses();
    }, [eventId]);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`http://localhost:9094/api/vendors/vendors/${eventId}`);
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
            alert('Failed to fetch vendors');
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`http://localhost:8222/api/expenses/events/${eventId}`);
            console.log('Fetched expenses:', response.data);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const getPaidAmount = (vendorId) => {
        // Filter expenses for this vendor
        const vendorExpenses = expenses.filter(expense => 
            expense.vendorId === vendorId
        );
        
        // Sum up all expenses for this vendor regardless of payment status
        const totalPaid = vendorExpenses.reduce((sum, expense) => {
            return sum + parseFloat(expense.totalAmount || 0);
        }, 0);
            
        return totalPaid;
    };

    const updatePaymentStatus = async (vendor) => {
        const paidAmount = getPaidAmount(vendor.vendorId);
        let newStatus = 'PENDING';

        if (paidAmount >= vendor.vendorAmount) {
            newStatus = 'PAID';
        } else if (paidAmount > 0) {
            newStatus = 'PARTIAL';
        }

        if (newStatus !== vendor.vendorPaymentStatus) {
            try {
                const updatedVendor = {
                    ...vendor,
                    vendorPaymentStatus: newStatus
                };
                await axios.put(`http://localhost:9094/api/vendors/update/${vendor.vendorId}`, updatedVendor);
                fetchVendors();
            } catch (error) {
                console.error('Error updating vendor payment status:', error);
            }
        }
    };

    useEffect(() => {
        vendors.forEach(vendor => {
            updatePaymentStatus(vendor);
        });
    }, [expenses, vendors]);

    const handleDelete = async (vendorId) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            try {
                await axios.delete(`http://localhost:9094/api/vendors/delete/${vendorId}`);
                fetchVendors();
            } catch (error) {
                console.error('Error deleting vendor:', error);
                alert('Failed to delete vendor');
            }
        }
    };

    const handleEdit = (vendor) => {
        setEditingVendor(vendor);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9094/api/vendors/update/${editingVendor.vendorId}`, editingVendor);
            setShowEditModal(false);
            fetchVendors();
        } catch (error) {
            console.error('Error updating vendor:', error);
            alert('Failed to update vendor');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingVendor(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-emerald-400">Vendors List</h1>
                    <button 
                        onClick={handleBack}
                        className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2 rounded hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Back to Event
                    </button>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Company Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Service Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Contact Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Decided Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Paid</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Payment Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {vendors.map((vendor) => {
                                    const paidAmount = getPaidAmount(vendor.vendorId);
                                    return (
                                        <tr key={vendor.vendorId} className="hover:bg-white/5 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorCompanyName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorServiceType}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorPhone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorEmail}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{vendor.vendorAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{paidAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    vendor.vendorPaymentStatus === 'PAID' 
                                                        ? 'bg-emerald-100 text-emerald-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {vendor.vendorPaymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mr-4"
                                                        onClick={() => handleEdit(vendor)}>
                                                    <FaEdit className="h-5 w-5" />
                                                </button>
                                                <button className="text-rose-400 hover:text-rose-300 transition-colors duration-200"
                                                        onClick={() => handleDelete(vendor.vendorId)}>
                                                    <FaTrash className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && editingVendor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-lg p-6 max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">Edit Vendor</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Company Name*</label>
                                <input
                                    type="text"
                                    name="vendorCompanyName"
                                    value={editingVendor.vendorCompanyName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Service Type*</label>
                                <select
                                    name="vendorServiceType"
                                    value={editingVendor.vendorServiceType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                >
                                    <option value="Catering">Catering</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Decoration">Decoration</option>
                                    <option value="Music">Music</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Contact Name*</label>
                                <input
                                    type="text"
                                    name="vendorName"
                                    value={editingVendor.vendorName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Phone*</label>
                                <input
                                    type="tel"
                                    name="vendorPhone"
                                    value={editingVendor.vendorPhone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Email*</label>
                                <input
                                    type="email"
                                    name="vendorEmail"
                                    value={editingVendor.vendorEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Amount ($)*</label>
                                <input
                                    type="number"
                                    name="vendorAmount"
                                    value={editingVendor.vendorAmount}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-1">Payment Status*</label>
                                <select
                                    name="vendorPaymentStatus"
                                    value={editingVendor.vendorPaymentStatus}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PARTIAL">Partial</option>
                                    <option value="PAID">Paid</option>
                                </select>
                            </div>
                            <div className="col-span-2 flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 border border-emerald-400 text-emerald-400 rounded hover:bg-emerald-400/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded hover:shadow-lg hover:scale-105"
                                >
                                    Update Vendor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewVendors;