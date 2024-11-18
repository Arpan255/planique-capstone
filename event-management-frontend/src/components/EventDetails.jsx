import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import GoogleCalendar from './GoogleCalendar';
import '../assets/EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [venue, setVenue] = useState(null);
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [showVenue, setShowVenue] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [serviceProviders, setServiceProviders] = useState([]);

  const [eventDetails, setEventDetails] = useState({
    name: '',
    description: '',
    date: '',
    budget: 0,
    status: ''
  });
  const [venueForm, setVenueForm] = useState({
    eventId: '',
    name: '',
    address: '',
    owner: '',
    phone: '',
    email: '',
    cost: 0,
    notes: ''
  });
  const [vendorForm, setVendorForm] = useState({
    eventId: '',
    vendorCompanyName: '',
    vendorServiceType: '',
    vendorName: '',
    vendorPhone: '',
    vendorEmail: '',
    vendorAmount: 0,
    vendorPaymentStatus: '',
  });
  const [guestForm, setGuestForm] = useState({
    eventId: '',
    name: '',
    email: '',
    rsvpStatus: '',
    phone: ''
  });
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    eventId: '',
    vendorId: '',
    expenseDescription: '',
    totalAmount: '',
    expenseDate: '',
    expenseCategory: '',
    expensePaymentMethod: '',
    paymentStatus: '',
    invoiceNumber: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingVenue, setIsEditingVenue] = useState(false);
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showExpenseModal) {
      fetchVendorsAndVenue();
    }
  }, [showExpenseModal]);

  const fetchVendorsAndVenue = async () => {
    try {
      // Fetch vendors
      const vendorsResponse = await fetch(`http://localhost:9094/api/vendors/vendors/${eventId}`);
      const vendorsData = await vendorsResponse.json();

      // Fetch venue
      const venueResponse = await fetch(`http://localhost:9093/venue/event/${eventId}`);
      const venueData = await venueResponse.json();

      // Transform venue data to match vendor structure
      const venueAsProvider = venueData ? [{
        vendorId: `venue_${venueData.venueId}`, // Prefix to distinguish from vendor IDs
        vendorCompanyName: venueData.name,
        vendorServiceType: 'VENUE',
        vendorAmount: venueData.cost,
        vendorPaymentStatus: 'PENDING' // You might want to add a payment status field to your venue model
      }] : [];
      const allProviders = [...vendorsData, ...venueAsProvider];
      setServiceProviders(allProviders);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Modify the expense input change handler
  const handleExpenseInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'vendorId') {
      const selectedProvider = serviceProviders.find(provider => 
        provider.vendorId.toString() === value.toString()
      );
      
      if (selectedProvider) {
        setExpenseForm(prevForm => ({
          ...prevForm,
          vendorId: value,
          totalAmount: selectedProvider.vendorAmount,
          paymentStatus: selectedProvider.vendorPaymentStatus.toUpperCase(),
          expenseCategory: selectedProvider.vendorServiceType.toUpperCase(),
        }));
      }
    } else {
      setExpenseForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };


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
      const response = await fetch(`http://localhost:9093/venue/event/${eventId}`);
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
      const response = await fetch(`http://localhost:9092/api/guests/event/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setGuests(data);
      } else {
        console.error("Failed to fetch guests");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewVenue = () => {
    navigate(`/viewvenue/${eventId}`);
  };

  const handleViewGuests = () => {
    navigate(`/viewguests/${eventId}`);
  };

  useEffect(() => {
    if (showVenue) {
      fetchVenue();
    }
  }, [showVenue, eventId]);

  const openModal = (vendor = null) => {
    if (vendor) {
      setVendorForm(vendor);
      setIsEditing(true);
    } else {
      setVendorForm({
        eventId: eventId,
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

  const openVenueModal = (venue = null) => {
    if (venue) {
      setVenueForm(venue);
      setIsEditingVenue(true);
    } else {
      setVenueForm({
        eventId: eventId,
        name: '',
        address: '',
        owner: '',
        phone: '',
        email: '',
        cost: 0,
        notes: ''
      });
      setIsEditingVenue(false);
    }
    setShowVenueModal(true);
  };

  const openGuestModal = (guest = null) => {
    if (guest) {
      setGuestForm(guest);
      setIsEditingGuest(true);
    } else {
      setGuestForm({
        eventId: eventId,
        name: '',
        email: '',
        rsvpStatus: '',
        phone: ''
      });
      setIsEditingGuest(false);
    }
    console.log(guestForm);
    setShowGuestModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
    setVendorForm({
      eventId: eventId,
      vendorCompanyName: '',
      vendorServiceType: '',
      vendorName: '',
      vendorPhone: '',
      vendorEmail: '',
      vendorAmount: 0,
      vendorPaymentStatus: '',
    });
  };

  const closeVenueModal = () => {
    setShowVenueModal(false);
    setMessage('');
    setVenueForm({
      eventId: eventId,
      name: '',
      address: '',
      owner: '',
      phone: '',
      email: '',
      cost: 0,
      notes: ''
    });
  };

  const closeGuestModal = () => {
    setShowGuestModal(false);
    setMessage('');
    setGuestForm({
      eventId: eventId,
      name: '',
      email: '',
      rsvpStatus: '',
      phone: ''
    });
  };

  const handleViewVendors = () => {
    navigate(`/viewvendors/${eventId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleVenueInputChange = (e) => {
    const { name, value } = e.target;
    setVenueForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleGuestInputChange = (e) => {
    const { name, value } = e.target;
    setGuestForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addVendor = async () => {
    try {
      // const nextVendorId = vendors.length > 0 ? Math.max(...vendors.map(vendor => vendor.vendorId)) + 1 : 1;
      const newVendorForm = { ...vendorForm, eventId };
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

  const addVenue = async () => {
    try {
      const nextVenueId = venue ? venue.venueId + 1 : 1;
      const newVenueForm = { ...venueForm, venueId: nextVenueId };
      const response = await fetch('http://localhost:9093/venue/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVenueForm),
      });

      if (response.ok) {
        fetchVenue();
        alert("Venue Added Successfully");
        setMessage('Venue added successfully!');
        closeVenueModal();
      }
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };


  const addGuest = async () => {
    try {
      // const nextGuestId = guests.length > 0 ? Math.max(...guests.map(guest => guest.guestId)) + 1 : 1;
      // const newGuestForm = { ...guestForm, guestId: nextGuestId };
      // Add eventId to the guest form data
      const guestFormWithEventId = { ...guestForm, eventId };

      const response = await fetch('http://localhost:9092/api/guests/addguests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestFormWithEventId),
      });

      if (response.ok) {
        fetchGuests();
        alert("Guest Added Successfully");
        setMessage('Guest added successfully!');
        closeGuestModal();
      } else {
        throw new Error('Failed to add guest');
      }
    } catch (error) {
      console.error('Error adding guest:', error);
      setMessage('Error adding guest');
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

  const updateVenue = async () => {
    try {
      const response = await fetch(`http://localhost:9093/venue/updateVenue/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueForm),
      });
      if (response.ok) {
        fetchVenue();
        setMessage('Venue updated successfully!');
        closeVenueModal();
      }
    } catch (error) {
      console.error('Error updating venue:', error);
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

  const deleteVenue = async () => {
    try {
      await fetch(`http://localhost:9093/venue/delete/${venue.venueId}`, {
        method: 'DELETE',
      });
      setVenue(null);
      setMessage('Venue deleted successfully!');
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateVendor() : addVendor();
  };

  const handleVenueSubmit = (e) => {
    e.preventDefault();
    isEditingVenue ? updateVenue() : addVenue();
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    isEditingGuest ? updateGuest() : addGuest();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleVenueBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeVenueModal();
    }
  };

  const handleGuestBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeGuestModal();
    }
  };
  
  const handleGoogleCalendarClick = () => {
    <Link to={`/google-calendar/${eventId}`}>Go to Google Calendar</Link>;
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8222/api/expenses/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
        
        // Calculate total expenses
        const total = data.reduce((sum, expense) => sum + parseFloat(expense.totalAmount), 0);
        setTotalExpenses(total);
        
        // Calculate remaining budget
        const remaining = eventDetails.budget - total;
        setRemainingBudget(remaining);
      } else {
        console.error("Failed to fetch expenses");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (showBudget) {
      fetchExpenses();
    }
  }, [showBudget, eventId]);


  const openExpenseModal = (expense = null) => {
    if (expense) {
      setExpenseForm(expense);
      setIsEditing(true);
    } else {
      setExpenseForm({
        eventId: eventId,
        vendorId: '',
        expenseDescription: '',
        totalAmount: '',
        expenseDate: '',
        expenseCategory: '',
        expensePaymentMethod: '',
        paymentStatus: '',
        invoiceNumber: ''
      });
      setIsEditing(false);
    }
    setShowExpenseModal(true);
  };
  const closeExpenseModal = () => {
    setShowExpenseModal(false);
    setMessage('');
    setExpenseForm({
      eventId: '',
      vendorId: '',
      expenseDescription: '',
      totalAmount: '',
      expenseDate: '',
      expenseCategory: '',
      expensePaymentMethod: '',
      paymentStatus: '',
      invoiceNumber: ''
    });
  };

  // const handleExpenseInputChange = (e) => {
  //   const { name, value } = e.target;
    
  //   // Special handling for vendor selection
  //   if (name === 'vendorId') {
  //     const selectedVendor = vendors.find(vendor => vendor.vendorId.toString() === value);
  //     if (selectedVendor) {
  //       setExpenseForm(prevForm => ({
  //         ...prevForm,
  //         vendorId: value,
  //         totalAmount: selectedVendor.vendorAmount,
  //         paymentStatus: selectedVendor.vendorPaymentStatus.toUpperCase(),
  //         expenseCategory: selectedVendor.vendorServiceType.toUpperCase(),
  //       }));
  //     }
  //   } else {
  //     setExpenseForm(prevForm => ({
  //       ...prevForm,
  //       [name]: value,
  //     }));
  //   }
  // };
  
  const addExpense = async () => {
    try {
      const newExpenseForm = { ...expenseForm, eventId };
      const response = await fetch('http://localhost:8222/api/expenses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpenseForm),
      });

      if (response.ok) {
        fetchExpenses();
        alert("Expense Added Successfully");
        setMessage('Expense added successfully!');
        closeExpenseModal();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    addExpense();
  };
  const handleViewExpenses = () => {
    // Pass budget information as URL parameters
    navigate(`/viewexpenses/${eventId}`, {
      state: {
        totalBudget: eventDetails.budget,
        totalExpenses: totalExpenses,
        remainingBudget: remainingBudget
      }
    });
  };
  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9091/event/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setEventDetails(data);
      } else {
        console.error("Failed to fetch event details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add event details to useEffect
  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);
  



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="flex justify-end gap-4 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="mb-6 bg-slate-800/50 backdrop-blur-lg rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-emerald-400 mb-4">{eventDetails.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Description</p>
            <p className="text-slate-200">{eventDetails.description}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Date</p>
            <p className="text-slate-200">
              {new Date(eventDetails.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Budget</p>
            <p className="text-slate-200">${eventDetails.budget}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Status</p>
            <p className="text-slate-200">{eventDetails.status}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Left half - Other cards */}
        <div className="w-1/2 grid grid-cols-2 gap-4 pr-1">
          {/* Vendors Card */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow p-4 hover:shadow-lg transition-all duration-300 max-h-fit">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Vendors</h2>
            {message && (
              <div className="bg-emerald-900/50 text-emerald-400 p-2 rounded mb-2">
                {message}
              </div>
            )}
            <div className="flex gap-2 mb-4">
              <button onClick={() => openModal()} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-3 py-1 rounded hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                Create Vendor
              </button>
              <button onClick={handleViewVendors} className="border border-emerald-400 text-emerald-400 px-3 py-1 rounded hover:bg-emerald-400/10 transition-colors text-sm">
                View Vendors
              </button>
            </div>
          </div>

          {/* Venue Card */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow p-4 max-h-fit hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Venue</h2>
            <div className="flex gap-2 mb-4">
              <button onClick={() => openVenueModal()} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-3 py-1 rounded hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                Create Venue
              </button>
              <button onClick={handleViewVenue} className="border border-emerald-400 text-emerald-400 px-3 py-1 rounded hover:bg-emerald-400/10 transition-colors text-sm">
                View Venue
              </button>
            </div>
          </div>

          {/* Guests Card */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg max-h-fit shadow p-4 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Guests</h2>
            <div className="flex gap-2 mb-4">
              <button onClick={() => openGuestModal()} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-3 py-1 rounded hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                Add Guest
              </button>
              <button onClick={handleViewGuests} className="border border-emerald-400 text-emerald-400 px-3 py-1 rounded hover:bg-emerald-400/10 transition-colors text-sm">
                View Guests
              </button>
            </div>
          </div>

          {/* Budget Card */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl max-h-fit shadow-lg p-4 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Expenses</h2>
            {message && (
              <div className="bg-emerald-900/50 text-emerald-400 p-3 rounded-lg mb-4">
                {message}
              </div>
            )}
            <div className="flex gap-2 mb-4">
              <button onClick={() => openExpenseModal()} className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-3 py-1 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                Create Expense
              </button>
              <button onClick={handleViewExpenses} className="border border-emerald-400 text-emerald-400 px-3 py-1 rounded-lg hover:bg-emerald-400/10 transition-colors text-sm">
                View Expenses
              </button>
            </div>
            </div>
        </div>

        {/* Right half - Google Calendar */}
        <div className="w-1/2 pl-2">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow p-4 hover:shadow-lg transition-shadow h-full">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Google Calendar</h2>
            <GoogleCalendar eventId={eventId} />
          </div>
        </div>
      </div>

      {/* Modal for Vendor Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={handleBackdropClick}>
          <div className="bg-slate-800 rounded-lg p-6 max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">{isEditing ? 'Edit Vendor' : 'Add New Vendor'}</h2>
      
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-slate-300 text-sm font-semibold mb-1">Company Name*</label>
                <input
                  type="text"
                  name="vendorCompanyName"
                  value={vendorForm.vendorCompanyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter company name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Service Type*</label>
                <select
                  name="vendorServiceType"
                  value={vendorForm.vendorServiceType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                >
                  <option value="" className="bg-slate-800 text-slate-200">Select Service Type</option>
                  <option value="Catering" className="bg-slate-800 text-slate-200">Catering</option>
                  <option value="Photography" className="bg-slate-800 text-slate-200">Photography</option>
                  <option value="Decoration" className="bg-slate-800 text-slate-200">Decoration</option>
                  <option value="Music" className="bg-slate-800 text-slate-200">Music</option>
                  <option value="Transportation" className="bg-slate-800 text-slate-200">Transportation</option>
                  <option value="Other" className="bg-slate-800 text-slate-200">Other</option>
                </select>
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Contact Person*</label>
                <input
                  type="text"
                  name="vendorName"
                  value={vendorForm.vendorName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter contact person name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="vendorPhone"
                  value={vendorForm.vendorPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Email Address*</label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={vendorForm.vendorEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Decided Amount</label>
                <input
                  type="number"
                  name="vendorAmount"
                  value={vendorForm.vendorAmount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                />
              </div>
      
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Payment Status*</label>
                <select
                  name="vendorPaymentStatus"
                  value={vendorForm.vendorPaymentStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
                  style={{backgroundColor: '#1e293b'}} // Darker background for better contrast
                >
                  <option value="" className="bg-slate-800 text-slate-200">Select Status</option>
                  <option value="Pending" className="bg-slate-800 text-slate-200">Pending</option>
                  <option value="Partial" className="bg-slate-800 text-slate-200">Partial</option>
                  <option value="Completed" className="bg-slate-800 text-slate-200">Completed</option>
                </select>
              </div>
      
              <div className="col-span-2 flex gap-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-emerald-400 text-emerald-400 rounded hover:bg-emerald-400/10 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded hover:shadow-lg hover:scale-105 transition-all font-medium"
                >
                  {isEditing ? 'Update Vendor' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Venue Add/Edit */}
      {showVenueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={handleVenueBackdropClick}>
          <div className="bg-slate-800 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-emerald-400 text-center">{isEditingVenue ? 'Edit Venue' : 'Add New Venue'}</h2>
            
            <form onSubmit={handleVenueSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Venue Name*</label>
                <input
                  type="text"
                  name="name"
                  value={venueForm.name}
                  onChange={handleVenueInputChange}
                  required
                  placeholder="Enter venue name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={venueForm.address}
                  onChange={handleVenueInputChange}
                  required
                  placeholder="Enter venue address"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Owner*</label>
                  <input
                    type="text"
                    name="owner"
                    value={venueForm.owner}
                    onChange={handleVenueInputChange}
                    required
                    placeholder="Owner name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-1">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={venueForm.phone}
                    onChange={handleVenueInputChange}
                    required
                    placeholder="Phone number"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={venueForm.email}
                  onChange={handleVenueInputChange}
                  required
                  placeholder="Email address"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Cost ($)*</label>
                <input
                  type="number"
                  name="cost"
                  value={venueForm.cost}
                  onChange={handleVenueInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Venue cost"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={venueForm.notes}
                  onChange={handleVenueInputChange}
                  placeholder="Additional notes"
                  rows="2"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200 resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={closeVenueModal}
                  className="px-3 py-1 border border-emerald-400 text-emerald-400 rounded hover:bg-emerald-400/10 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded hover:shadow-lg hover:scale-105 transition-all font-medium text-sm"
                >
                  {isEditingVenue ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{showExpenseModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdropClick}>
    <div className="bg-slate-800 rounded-xl p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-8 text-emerald-400 text-center">
        {isEditing ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleExpenseSubmit} className="grid grid-cols-2 gap-6">
      <div className="col-span-2">
            <label className="block text-slate-300 text-sm font-semibold mb-2">Service Provider*</label>
            <select
              name="vendorId"
              value={expenseForm.vendorId}
              onChange={handleExpenseInputChange}
              required
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
            >
              <option value="">Select Service Provider</option>
              {serviceProviders.map((provider) => (
                <option key={provider.vendorId} value={provider.vendorId}>
                  {provider.vendorCompanyName} - {provider.vendorServiceType}
                </option>
              ))}
            </select>
          </div>
        <div className="col-span-2">
          <label className="block text-slate-300 text-sm font-semibold mb-2">Description*</label>
          <input
            type="text"
            name="expenseDescription"
            value={expenseForm.expenseDescription}
            onChange={handleExpenseInputChange}
            required
            placeholder="Enter expense description"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2">Amount ($)*</label>
          <input
            type="number"
            name="totalAmount"
            value={expenseForm.totalAmount}
            onChange={handleExpenseInputChange}
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2">Payment Method*</label>
          <select
            name="expensePaymentMethod"
            value={expenseForm.expensePaymentMethod}
            onChange={handleExpenseInputChange}
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
            style={{backgroundColor: '#1e293b'}} // Darker background for better contrast
          >
            <option value="" className="bg-slate-800 text-slate-200">Select Payment Method</option>
            <option value="CASH" className="bg-slate-800 text-slate-200">Cash</option>
            <option value="CARD" className="bg-slate-800 text-slate-200">Card</option>
            <option value="UPI" className="bg-slate-800 text-slate-200">UPI</option>
            <option value="BANK_TRANSFER" className="bg-slate-800 text-slate-200">Bank Transfer</option>
          </select>
        </div>
        {/* <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={expenses.length + 1} // Auto-increment invoice number based on existing expenses
            readOnly
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none transition-all duration-300 text-slate-200"
          />
        </div> */}
        
        <div className="col-span-2 flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={closeExpenseModal}
            className="px-6 py-3 border-2 border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400/10 transition-colors duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
          >
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Modal for Guest Add/Edit */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={handleGuestBackdropClick}>
          <div className="bg-slate-800 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-emerald-400 text-center">{isEditingGuest ? 'Edit Guest' : 'Add New Guest'}</h2>
            
            <form onSubmit={handleGuestSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={guestForm.name}
                  onChange={handleGuestInputChange}
                  required
                  placeholder="Enter guest name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Email*</label>
                <input
                  type="email" 
                  name="email"
                  value={guestForm.email}
                  onChange={handleGuestInputChange}
                  required
                  placeholder="Enter guest email"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={guestForm.phone}
                  onChange={handleGuestInputChange}
                  placeholder="Enter guest phone"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1">RSVP Status</label>
                <select
                  name="rsvpStatus"
                  value={guestForm.rsvpStatus}
                  onChange={handleGuestInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-2 focus:ring-emerald-400 outline-none text-white"
                >
                  <option value="" className="bg-slate-700 text-white">Select status</option>
                  <option value="Pending" className="bg-slate-700 text-white">Pending</option>
                  <option value="Confirmed" className="bg-slate-700 text-white">Confirmed</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={closeGuestModal}
                  className="px-3 py-1 border border-emerald-400 text-emerald-400 rounded hover:bg-emerald-400/10 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded hover:shadow-lg hover:scale-105 transition-all font-medium text-sm"
                >
                  {isEditingGuest ? 'Update' : 'Add'}
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
