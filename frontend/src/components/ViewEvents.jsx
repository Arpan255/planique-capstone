import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

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
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-black-800 mb-6">View Events</h2>
        
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Link
                key={event.eventId}
                to={`/event-details/${event.eventId}`}
                className="block bg-blue-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-black-800">{event.name}</h3>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-gray-600">Date: {new Date(event.date).toLocaleString()}</p>
                    <p className="text-gray-600">Budget: ${event.budget}</p>
                    <p className="text-gray-600">Status: {event.status}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleDelete(event.eventId);
                    }}
                    className="text-red-600 hover:text-red-800"
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
  );
};

export default ViewEvents;
