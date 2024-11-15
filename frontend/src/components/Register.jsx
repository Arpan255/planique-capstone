import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
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
        alert('User Registered Successfully');
        // Optionally redirect to login page
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
    <div className="min-h-screen flex items-center justify-center">
      {/* Fixed Header */}
      <header className="bg-blue-600 w-full p-4 fixed top-0 left-0 flex justify-between items-center z-50">
        <h1 className="text-white text-2xl font-bold">Planique</h1>
      </header>

      {/* Registration Form */}
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-black-800 text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
          <p className="text-gray-600 text-sm text-center mt-4">
            If already registered, <Link to="/login" className="text-blue-500">log in from here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
