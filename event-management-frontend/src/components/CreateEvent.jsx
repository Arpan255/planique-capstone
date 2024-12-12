import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    username: localStorage.getItem('username') || '',
    name: '',
    description: '', 
    date: '',
    type: '',
    budget: '',
    status: 'In Progress',
    googleCalendarEventId: ''
  });

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:9091/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        alert('Event created successfully!');
        navigate('/view-events');
      } else {
        alert('Error creating event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error creating the event');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Arial'] flex flex-col">
      <header className="w-full bg-slate-900 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center transform transition-transform duration-300">
              <h1 className="text-xl font-bold text-slate-900">P</h1>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent transition-transform duration-300">Planique</h1>
          </Link>
          <div className="flex items-center">
            {username ? (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded font-medium hover:shadow-lg transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded font-medium hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded font-medium hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-8 m-4 bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/50">
          <h2 className="text-3xl font-bold text-center text-white mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Create Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2" htmlFor="name">
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={eventDetails.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2" htmlFor="date">
                Event Date
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={eventDetails.date}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white [color-scheme:dark]"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2" htmlFor="type">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={eventDetails.type}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white [&>*]:bg-slate-900"
                required
              >
                <option value="">Select event type</option>
                <option value="Celebration">Celebration</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Conference">Conference</option>
                <option value="Funeral">Funeral</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2" htmlFor="budget">
                Budget(in INR)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={eventDetails.budget}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 font-bold rounded-lg hover:from-emerald-500 hover:to-teal-500 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
