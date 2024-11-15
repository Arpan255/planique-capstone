import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoogleCalendar from './GoogleCalendar';
import '../assets/EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [vendors, setVendors] = useState([]);
  const [venue, setVenue] = useState(null);
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [showVenue, setShowVenue] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [vendorForm, setVendorForm] = useState({
    vendorId: '',
    vendorCompanyName: '',
    vendorServiceType: '',
    vendorName: '',
    vendorPhone: '',
    vendorEmail: '',
    vendorAmount: 0,
    vendorPaymentStatus: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const fetchVendors = async () => {
    try {
      const response = await fetch(`http://localhost:9094/api/vendors/vendors/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      } else {
        console.error("Failed to fetch vendors");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (showVendors) {
      fetchVendors();
    }
  }, [showVendors, eventId]);

  const openModal = (vendor = null) => {
    if (vendor) {
      setVendorForm(vendor);
      setIsEditing(true);
    } else {
      setVendorForm({
        vendorId: '',
        vendorCompanyName: '',
        vendorServiceType: '',
        vendorName: '',
        vendorPhone: '',
        vendorEmail: '',
        vendorAmount: 0,
        vendorPaymentStatus: '',
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
    setVendorForm({
      vendorId: '',
      vendorCompanyName: '',
      vendorServiceType: '',
      vendorName: '',
      vendorPhone: '',
      vendorEmail: '',
      vendorAmount: 0,
      vendorPaymentStatus: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addVendor = async () => {
    try {
      const nextVendorId = vendors.length > 0 ? Math.max(...vendors.map(vendor => vendor.vendorId)) + 1 : 1;
      const newVendorForm = { ...vendorForm, vendorId: nextVendorId };
      const response = await fetch('http://localhost:9094/api/vendors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newVendorForm, eventId }),
      });

      if (response.ok) {
        fetchVendors();
        alert("Vendor Added Successfully");
        setMessage('Vendor added successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  const updateVendor = async () => {
    try {
      const response = await fetch(`http://localhost:9094/api/vendors/update/${vendorForm.vendorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorForm),
      });
      if (response.ok) {
        fetchVendors();
        setMessage('Vendor updated successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  const deleteVendor = async (vendorId) => {
    try {
      await fetch(`http://localhost:9094/api/vendors/delete/${vendorId}`, {
        method: 'DELETE',
      });
      fetchVendors();
      setMessage('Vendor deleted successfully!');
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateVendor() : addVendor();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  const handleGoogleCalendarClick = () => {
    <Link to={`/google-calendar/${eventId}`}>Go to Google Calendar</Link>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Vendors Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Vendors</h2>
          {message && (
            <div className="bg-emerald-900/50 text-emerald-400 p-3 rounded-lg mb-4">
              {message}
            </div>
          )}
          <div className="flex gap-4 mb-6">
            <button onClick={() => openModal()} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
              Create Vendor
            </button>
            <button onClick={() => setShowVendors(prev => !prev)} className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors">
              {showVendors ? "Hide Vendors" : "View Vendors"}
            </button>
          </div>

          {showVendors && (
            <div className={`space-y-4 overflow-y-auto max-h-[300px] pr-2`}>
              {vendors.map((vendor) => (
                <div key={vendor.vendorId} className="border border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">{vendor.vendorCompanyName}</h3>
                  <p className="text-slate-300"><span className="font-medium">Service Type:</span> {vendor.vendorServiceType}</p>
                  <p className="text-slate-300"><span className="font-medium">Vendor Name:</span> {vendor.vendorName}</p>
                  <p className="text-slate-300"><span className="font-medium">Phone:</span> {vendor.vendorPhone}</p>
                  <p className="text-slate-300"><span className="font-medium">Email:</span> {vendor.vendorEmail}</p>
                  <p className="text-slate-300"><span className="font-medium">Cost:</span> ${vendor.vendorAmount}</p>
                  <p className="text-slate-300"><span className="font-medium">Status:</span> {vendor.vendorPaymentStatus}</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => openModal(vendor)} className="text-emerald-400 hover:text-emerald-300">
                      Edit
                    </button>
                    <button onClick={() => deleteVendor(vendor.vendorId)} className="text-rose-400 hover:text-rose-300">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Venue Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Venue</h2>
          <button onClick={() => setShowVenue(prev => !prev)} className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors">
            {showVenue ? "Hide Venue" : "View Venue"}
          </button>
          {showVenue && venue && (
            <div className="mt-4">
              <p className="text-slate-300"><span className="font-medium">Name:</span> {venue.name}</p>
              <p className="text-slate-300"><span className="font-medium">Address:</span> {venue.address}</p>
              <p className="text-slate-300"><span className="font-medium">Owner:</span> {venue.owner}</p>
              <p className="text-slate-300"><span className="font-medium">Phone:</span> {venue.phone}</p>
              <p className="text-slate-300"><span className="font-medium">Email:</span> {venue.email}</p>
              <p className="text-slate-300"><span className="font-medium">Cost:</span> ${venue.cost}</p>
              <p className="text-slate-300"><span className="font-medium">Notes:</span> {venue.notes}</p>
            </div>
          )}
        </div>

        {/* Guest List Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Guest List</h2>
          <button onClick={() => setShowGuests(prev => !prev)} className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors">
            {showGuests ? "Hide Guests" : "View Guests"}
          </button>
          {showGuests && (
            <div className="space-y-4 mt-4">
              {guests.map((guest) => (
                <div key={guest.id} className="border border-slate-700 rounded-lg p-4 bg-slate-800/30">
                  <p className="text-slate-300"><span className="font-medium">Name:</span> {guest.name}</p>
                  <p className="text-slate-300"><span className="font-medium">Email:</span> {guest.email}</p>
                  <p className="text-slate-300"><span className="font-medium">Phone:</span> {guest.phone}</p>
                  <p className="text-slate-300"><span className="font-medium">RSVP Status:</span> {guest.rsvpStatus}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Budget Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Budget</h2>
          <button onClick={() => setShowBudget(prev => !prev)} className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors">
            {showBudget ? "Hide Budget" : "View Budget"}
          </button>
          {showBudget && (
            <div className="mt-4">
              {/* Add budget-related content here */}
            </div>
          )}
        </div>

        {/* Google Calendar Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Google Calendar</h2>
          <button onClick={() => setShowCalendar(prev => !prev)} className="border border-emerald-400 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors">
            {showCalendar ? "Hide Calendar" : "View Calendar"}
          </button>
          {showCalendar && <GoogleCalendar eventId={eventId} />}
        </div>
      </div>

      {/* Modal for Vendor Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdropClick}>
          <div className="bg-slate-800 rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-8 text-emerald-400 text-center">{isEditing ? 'Edit Vendor' : 'Add New Vendor'}</h2>
      
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-slate-300 text-sm font-semibold mb-2">Company Name*</label>
                <input
                  type="text"
                  name="vendorCompanyName"
                  value={vendorForm.vendorCompanyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter company name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Service Type*</label>
                <select
                  name="vendorServiceType"
                  value={vendorForm.vendorServiceType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                >
                  <option value="">Select Service Type</option>
                  <option value="Catering">Catering</option>
                  <option value="Photography">Photography</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Music">Music</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Contact Person*</label>
                <input
                  type="text"
                  name="vendorName"
                  value={vendorForm.vendorName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter contact person name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="vendorPhone"
                  value={vendorForm.vendorPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Email Address*</label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={vendorForm.vendorEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Amount ($)*</label>
                <input
                  type="number"
                  name="vendorAmount"
                  value={vendorForm.vendorAmount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Payment Status*</label>
                <select
                  name="vendorPaymentStatus"
                  value={vendorForm.vendorPaymentStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
      
              <div className="col-span-2 flex gap-4 justify-end mt-6">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-6 py-3 border-2 border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400/10 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                >
                  {isEditing ? 'Update Vendor' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
