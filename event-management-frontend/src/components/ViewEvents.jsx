import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:9091/event/showEvents', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error fetching events');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:9091/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.eventId !== eventId));
      } else {
        console.error('Error deleting event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Munich']">
      <header className="fixed w-full bg-slate-900/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                <h1 className="text-2xl font-black text-slate-900">P</h1>
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">Planique</h1>
            </Link>
            <div>
              {username ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-300 mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 px-6 pb-12">
        <div className="container mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">View Events</h2>
            
            {events.length === 0 ? (
              <p className="text-center text-slate-300">No events found.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <Link
                    key={event.eventId}
                    to={`/event-details/${event.eventId}`}
                    className="block bg-slate-700/50 border border-slate-600 p-6 rounded-lg backdrop-blur-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-400">{event.name}</h3>
                        <p className="text-slate-300">{event.description}</p>
                        <p className="text-slate-400">Date: {new Date(event.date).toLocaleString()}</p>
                        <p className="text-slate-400">Budget: ${event.budget}</p>
                        <p className="text-slate-400">Status: {event.status}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(event.eventId);
                        }}
                        className="text-rose-400 hover:text-rose-300 transition-colors duration-300"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
