import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function ViewGuests() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Guest List</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
                    >
                        Back to Event
                    </button>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Guest ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Event ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">RSVP Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">RSVP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {guests.map((guest) => (
                                    <tr key={guest.guestId} className="hover:bg-white/5 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{guest.guestId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{guest.eventId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{guest.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{guest.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{guest.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                guest.rsvpStatus === 'SENT' 
                                                    ? 'bg-emerald-100 text-emerald-800' 
                                                    : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                {guest.rsvpStatus || 'NOT_SENT'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 mr-4"
                                                    onClick={() => handleEdit(guest.guestId)}>
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button className="text-rose-400 hover:text-rose-300 transition-colors duration-200"
                                                    onClick={() => handleDelete(guest.guestId)}>
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                                                    guest.rsvpStatus === 'SENT' || loading
                                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-indigo-500/25'
                                                }`}
                                                onClick={() => handleSendRsvp(guest.guestId)}
                                                disabled={guest.rsvpStatus === 'SENT' || loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send RSVP'
                                                )}
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

export default ViewGuests;