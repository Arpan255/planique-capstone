import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username'); // Get username from localStorage
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('token');    // Clear the token from localStorage
    localStorage.removeItem('username'); // Clear the username from localStorage
    navigate('/');                       // Redirect to home page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="bg-blue-600 w-full p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Planique</h1>
        <div>
          {username ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center text-black-800 mb-6">
            Welcome to Planique, {username}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Your one-stop solution for planning and managing events, weddings, and conferences.
          </p>

          {/* Dashboard Actions */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-500 text-white text-center p-6 rounded-lg shadow-lg hover:bg-blue-600">
              <h3 className="text-xl font-semibold">Create Event</h3>
              <p className="mt-2 text-sm">Start planning your event with our tools.</p>
              <Link
                to="/create-event"
                className="mt-4 inline-block text-blue-200 hover:text-white"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-green-500 text-white text-center p-6 rounded-lg shadow-lg hover:bg-green-600">
              <h3 className="text-xl font-semibold">View Events</h3>
              <p className="mt-2 text-sm">Manage and track all your upcoming events.</p>
              <Link
                to="/view-events"
                className="mt-4 inline-block text-green-200 hover:text-white"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-blue-600 text-white text-center p-4 mt-8 w-full">
        <p>&copy; 2024 Planique. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
