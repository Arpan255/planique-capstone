import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function ViewGuests() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGuests();
    }, [eventId]);

    const fetchGuests = async () => {
        try {
            const response = await axios.get(`http://localhost:9092/api/guests/event/${eventId}`);
            setGuests(response.data);
        } catch (error) {
            console.error('Error fetching guests:', error);
            alert('Failed to fetch guests');
        }
    };

    const handleDelete = async (guestId) => {
        if (window.confirm('Are you sure you want to delete this guest?')) {
            try {
                await axios.delete(`http://localhost:9092/api/guests/delete/${guestId}`);
                fetchGuests();
            } catch (error) {
                console.error('Error deleting guest:', error);
                alert('Failed to delete guest');
            }
        }
    };

    const handleEdit = (guest) => {
        setEditingGuest(guest);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9092/api/guests/update/${editingGuest.guestId}`, editingGuest);
            setShowEditModal(false);
            setEditingGuest(null);
            fetchGuests();
        } catch (error) {
            console.error('Error updating guest:', error);
            alert('Failed to update guest');
        }
    };

    const handleSendRsvp = async (guestId) => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:9092/api/guests/${guestId}/send-rsvp`);
            alert('RSVP notification sent successfully');
            fetchGuests();
        } catch (error) {
            console.error('Error sending RSVP:', error);
            alert('Failed to send RSVP notification');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Guest List</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                    >
                        Back to Event
                    </button>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left p-4 text-slate-300">Name</th>
                                <th className="text-left p-4 text-slate-300">Email</th>
                                <th className="text-left p-4 text-slate-300">Phone</th>
                                <th className="text-left p-4 text-slate-300">RSVP Status</th>
                                <th className="text-right p-4 text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((guest) => (
                                <tr key={guest.guestId} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                    <td className="p-4">
                                        <span className="text-emerald-400 font-semibold">{guest.name}</span>
                                    </td>
                                    <td className="p-4 text-slate-300">{guest.email}</td>
                                    <td className="p-4 text-slate-300">{guest.phone || 'N/A'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            guest.rsvpStatus === 'SENT' 
                                                ? 'bg-emerald-400/20 text-emerald-400' 
                                                : 'bg-amber-400/20 text-amber-400'
                                        }`}>
                                            {guest.rsvpStatus || 'NOT_SENT'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end space-x-2">
                                            <button 
                                                onClick={() => handleEdit(guest)}
                                                className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors duration-300"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(guest.guestId)}
                                                className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors duration-300"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                                    guest.rsvpStatus === 'SENT' || loading
                                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 hover:shadow-lg hover:scale-105'
                                                }`}
                                                onClick={() => handleSendRsvp(guest.guestId)}
                                                disabled={guest.rsvpStatus === 'SENT' || loading}
                                            >
                                                {loading ? 'Sending...' : 'Send RSVP'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Edit Guest</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-emerald-400 text-sm font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    value={editingGuest.name}
                                    onChange={(e) => setEditingGuest({...editingGuest, name: e.target.value})}
                                    className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-emerald-400 text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={editingGuest.email}
                                    onChange={(e) => setEditingGuest({...editingGuest, email: e.target.value})}
                                    className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-emerald-400 text-sm font-semibold mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={editingGuest.phone || ''}
                                    onChange={(e) => setEditingGuest({...editingGuest, phone: e.target.value})}
                                    className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-emerald-400 text-sm font-semibold mb-2">RSVP Status</label>
                                <select
                                    value={editingGuest.rsvpStatus}
                                    onChange={(e) => setEditingGuest({...editingGuest, rsvpStatus: e.target.value})}
                                    className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                                >
                                    <option value="NOT_SENT">Pending</option>
                                    <option value="SENT">Confirmed</option>
                                </select>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg hover:shadow-lg transition-all duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingGuest(null);
                                    }}
                                    className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewGuests;