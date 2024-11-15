import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [vendors, setVendors] = useState([]);
  const [venue, setVenue] = useState(null);
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
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

  const fetchVenue = async () => {
    try {
      const response = await fetch(`http://localhost:9094/api/venues/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setVenue(data);
      } else {
        console.error("Failed to fetch venue");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchGuests = async () => {
    try {
      const response = await fetch(`http://localhost:9094/api/guests/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setGuests(data);
      } else {
        console.error("Failed to fetch guests");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (showVendors) {
      fetchVendors();
    }
    fetchVenue();
    fetchGuests();
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

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {/* Vendors Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Vendors</h2>
          {message && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
              {message}
            </div>
          )}
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Create Vendor
          </button>
          <button
            onClick={() => setShowVendors(prev => !prev)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            {showVendors ? "Hide Vendors" : "View Vendors"}
          </button>

          {showVendors && (
            <div className="space-y-4">
              {vendors.map((vendor) => (
                <div key={vendor.vendorId} className="bg-blue-100 p-4 rounded shadow-md">
                  <h3 className="text-xl font-semibold">{vendor.vendorCompanyName}</h3>
                  <p>Service Type: {vendor.vendorServiceType}</p>
                  <p>Vendor Name: {vendor.vendorName}</p>
                  <p>Phone: {vendor.vendorPhone}</p>
                  <p>Email: {vendor.vendorEmail}</p>
                  <p>Cost: ${vendor.vendorAmount}</p>
                  <p>Status: {vendor.vendorPaymentStatus}</p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => openModal(vendor)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVendor(vendor.vendorId)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Venue Card */}
        {venue && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Venue</h2>
            <p><strong>Name:</strong> {venue.name}</p>
            <p><strong>Address:</strong> {venue.address}</p>
            <p><strong>Owner:</strong> {venue.owner}</p>
            <p><strong>Phone:</strong> {venue.phone}</p>
            <p><strong>Email:</strong> {venue.email}</p>
            <p><strong>Cost:</strong> ${venue.cost}</p>
            <p><strong>Notes:</strong> {venue.notes}</p>
          </div>
        )}

        {/* Guest List Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Guest List</h2>
          <div className="space-y-4">
            {guests.map((guest) => (
              <div key={guest.id} className="bg-gray-100 p-4 rounded shadow-md">
                <p><strong>Name:</strong> {guest.name}</p>
                <p><strong>Email:</strong> {guest.email}</p>
                <p><strong>Phone:</strong> {guest.phone}</p>
                <p><strong>RSVP Status:</strong> {guest.rsvpStatus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Budget</h2>
          {/* Add budget-related content here */}
        </div>

        {/* Google Calendar Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Google Calendar</h2>
          {/* Add Google Calendar integration details here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">GuestList</h2>
          {/* Add Google Calendar integration details here */}
        </div>
      </div>

      {/* Modal for Vendor Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleBackdropClick}>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full overflow-auto max-h-[90vh]">
          <h2 className="text-2xl font-semibold text-center mb-6">{isEditing ? 'Edit Vendor' : 'Add Vendor'}</h2>
      
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vendor ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor ID</label>
              <input
                type="text"
                name="vendorId"
                value={vendorForm.vendorId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Vendor Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Company Name</label>
              <input
                type="text"
                name="vendorCompanyName"
                value={vendorForm.vendorCompanyName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <input
                type="text"
                name="vendorServiceType"
                value={vendorForm.vendorServiceType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Vendor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                value={vendorForm.vendorName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="vendorPhone"
                value={vendorForm.vendorPhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="vendorEmail"
                value={vendorForm.vendorEmail}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="vendorAmount"
                value={vendorForm.vendorAmount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Payment Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Status</label>
              <select
                name="vendorPaymentStatus"
                value={vendorForm.vendorPaymentStatus}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Payment Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
      
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? 'Update Vendor' : 'Add Vendor'}
            </button>
      
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="w-full mt-4 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default EventDetails;
