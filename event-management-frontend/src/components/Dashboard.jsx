import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
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

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="container mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
              Welcome to Planique, {username}
            </h2>
            <p className="text-center text-slate-300 text-lg mb-12">
              Your one-stop solution for planning and managing events, weddings, and conferences.
            </p>

            {/* Dashboard Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="p-8 text-slate-900 text-center transform group-hover:scale-105 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-4">Create Event</h3>
                  <p className="text-slate-800 mb-6">Start planning your event with our intuitive tools.</p>
                  <Link
                    to="/create-event"
                    className="inline-block px-6 py-3 bg-slate-900 text-emerald-400 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-300"
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
              <div className="group bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="p-8 text-slate-900 text-center transform group-hover:scale-105 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-4">View Events</h3>
                  <p className="text-slate-800 mb-6">Manage and track all your upcoming events.</p>
                  <Link
                    to="/view-events"
                    className="inline-block px-6 py-3 bg-slate-900 text-emerald-400 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-300"
                  >
                    View Events →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/90 backdrop-blur-md shadow-md mt-auto py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400">&copy; 2024 Planique. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
