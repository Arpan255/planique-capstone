import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewVenue = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const [venueForm, setVenueForm] = useState({
    venueId: '',
    eventId: '',
    name: '',
    address: '',
    owner: '',
    phone: '',
    email: '',
    cost: 0,
    notes: ''
  });

  useEffect(() => {
    fetchVenue();
    fetchExpenses();
  }, [eventId]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8222/api/expenses/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        // Filter expenses related to venue
        const venueExpenses = data.filter(expense => 
          expense.expenseCategory === 'VENUE'
        );
        setExpenses(venueExpenses);
        
        // Calculate total paid amount
        const totalPaid = venueExpenses.reduce((sum, expense) => 
          sum + parseFloat(expense.totalAmount || 0), 0
        );
        setPaidAmount(totalPaid);
        if (venue && totalPaid >= venue.cost) {
          setPaymentStatus('PAID');
        } else if (totalPaid > 0) {
          setPaymentStatus('PARTIAL');
        } else {
          setPaymentStatus('PENDING');
        }
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchVenue = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9093/venue/event/${eventId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setVenue(null);
          return;
        }
        throw new Error('Failed to fetch venue');
      }
      
      const text = await response.text(); // First get response as text
      if (!text) { // Check if response is empty
        setVenue(null);
        return;
      }
      
      try {
        const data = JSON.parse(text); // Try to parse the text as JSON
        setVenue(data);
      } catch (parseError) {
        console.error('Error parsing venue data:', parseError);
        throw new Error('Invalid venue data received');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setVenueForm(venue);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9093/venue/updateVenue/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueForm),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update venue');
      }
      
      await fetchVenue();
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9093/venue/delete/${eventId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete venue');
        }
        
        // Reset all relevant states after successful deletion
        setVenue(null);
        setExpenses([]);
        setPaidAmount(0);
        setPaymentStatus('PENDING');
        setError(null);
        
        // Optional: Show success message
        alert('Venue deleted successfully');
        
      } catch (error) {
        console.error('Error deleting venue:', error);
        setError(error.message);
        alert('Failed to delete venue. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-400">Venue Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2 rounded hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Back to Event
          </button>
        </div>

        {/* Venue Details Card */}
        <div className="bg-slate-800 border border-slate-700 shadow-xl rounded-lg p-6 hover:shadow-emerald-500/10 transition-all duration-300">
          {venue ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold mb-3">Basic Information</h3>
                  <p className="text-slate-300 mb-2"><span className="font-medium text-emerald-300">Name:</span> {venue.name}</p>
                  <p className="text-slate-300 mb-2"><span className="font-medium text-emerald-300">Address:</span> {venue.address}</p>
                  <p className="text-slate-300"><span className="font-medium text-emerald-300">Cost:</span> ₹{venue.cost}</p>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold mb-3">Contact Information</h3>
                  <p className="text-slate-300 mb-2"><span className="font-medium text-emerald-300">Owner:</span> {venue.owner}</p>
                  <p className="text-slate-300 mb-2"><span className="font-medium text-emerald-300">Phone:</span> {venue.phone}</p>
                  <p className="text-slate-300"><span className="font-medium text-emerald-300">Email:</span> {venue.email}</p>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg">
          <h3 className="text-emerald-400 font-semibold mb-3">Payment Information</h3>
          <p className="text-slate-300 mb-2">
            <span className="font-medium text-emerald-300">Total Cost:</span> ₹{venue?.cost || 0}
          </p>
          <p className="text-slate-300 mb-2">
            <span className="font-medium text-emerald-300">Paid Amount:</span> ₹{paidAmount}
          </p>
          <p className="text-slate-300 mb-2">
            <span className="font-medium text-emerald-300">Remaining:</span> ₹{(venue?.cost - paidAmount)}
          </p>
          <p className="text-slate-300">
            <span className="font-medium text-emerald-300">Payment Status:</span>{' '}
            <span className={`px-2 py-1 rounded-full text-xs ${
              paymentStatus === 'PAID' 
                ? 'bg-emerald-100 text-emerald-800' 
                : paymentStatus === 'PARTIAL'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {paymentStatus}
              </span>
                </p>
              </div>
            </div>
              {/* </div> */}
              
              <div className="mt-6 bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-semibold mb-3">Notes</h3>
                <p className="text-slate-300">{venue.notes || 'No notes available'}</p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2 rounded hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Edit Venue
                </button>
                <button
                  onClick={handleDelete}
                  className="border border-rose-400 text-rose-400 px-4 py-2 rounded hover:bg-rose-400/10 transition-colors"
                >
                  Delete Venue
                </button>
              </div>
            </>
          ) : (
            <p className="text-slate-300 text-center text-lg">No venue has been added for this event yet.</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">Edit Venue</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Venue Name</label>
                  <input
                    type="text"
                    name="name"
                    value={venueForm.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={venueForm.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Owner</label>
                  <input
                    type="text"
                    name="owner"
                    value={venueForm.owner}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={venueForm.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={venueForm.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={venueForm.cost}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={venueForm.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded hover:bg-emerald-400/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2 rounded hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVenue;