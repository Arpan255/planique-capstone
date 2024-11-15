import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Confetti from 'react-confetti';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8222/api/auth/validate/user', {
        name: username,
        password: password,
      });
      if (response.data) {
        localStorage.setItem('token', response.data);
        localStorage.setItem('username', username);
        
        setShowConfetti(true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Munich']">
      {showConfetti && <Confetti />}

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
          <h2 className="text-3xl font-semibold text-center text-emerald-400 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-slate-300" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-md text-slate-200 focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-300" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-md text-slate-200 focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>
            {errorMessage && <div className="text-rose-400 text-center mb-4">{errorMessage}</div>}
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 p-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-emerald-400 hover:text-teal-400 transition-colors duration-300">Don't have an account? Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
