import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8222/api/auth/register', {
        name,
        email,
        password
      });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Failed to register. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your network.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
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
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link to="/tutorials" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium">
                Tutorials
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-20 flex justify-center items-center min-h-screen">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-emerald-400 mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="name"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-200"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-200"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-rose-400 text-sm text-center mb-4">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 p-4 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-slate-400 text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;