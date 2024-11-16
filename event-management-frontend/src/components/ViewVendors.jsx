import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function ViewVendors() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchVendors();
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

    const handleEdit = async (vendorId) => {
        // Navigation or edit logic here
        console.log("Edit vendor:", vendorId);
    };

    const handleBack = () => {
        navigate(-1); // This will go back one page in history
        // Alternatively, you can use the direct URL:
        // navigate(`/event-details/${eventId}`);
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
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Payment Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {vendors.map((vendor) => (
                                    <tr key={vendor.vendorId} className="hover:bg-white/5 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorCompanyName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorServiceType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorPhone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vendor.vendorEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${vendor.vendorAmount}</td>
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
                                                    onClick={() => handleEdit(vendor.vendorId)}>
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button className="text-rose-400 hover:text-rose-300 transition-colors duration-200"
                                                    onClick={() => handleDelete(vendor.vendorId)}>
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewVendors;