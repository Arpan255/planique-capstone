import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Confetti from 'react-confetti'; // Import react-confetti

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false); // State to manage confetti display
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8222/api/auth/validate/user', {
        name: username,
        password: password,
      });
      if (response.data) {
        localStorage.setItem('token', response.data);  // Save the JWT token to localStorage
        localStorage.setItem('username', username);    // Save the username to localStorage
        
        setShowConfetti(true);  // Trigger confetti on successful login

        setTimeout(() => {
          navigate('/dashboard'); // Redirect to the dashboard after showing confetti
        }, 3000);  // Wait for 3 seconds before navigating
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      {showConfetti && <Confetti />} {/* Show confetti when successful login */}

      <header className="bg-blue-600 w-full p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Planique</h1>
      </header>

      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-black-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">Don't have an account? Register here</Link>
          </div>
        </div>
      </div>

      {/* <footer className="bg-blue-600 text-white text-center p-4 mt-8 w-full">
        <p>&copy; 2024 Planique. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Login;
