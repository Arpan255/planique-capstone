import React, { useRef } from 'react'; // Import useRef here
import { Link } from 'react-router-dom';
import eventImage from '../assets/eventImage.jpg'; // Replace with your image path
import gifImage from '../assets/planner-party-planner.gif'; // Replace with your GIF file path
import manageIcon from '../assets/manageIcon.png';
import budgetIcon from '../assets/budgetIcon.png';
import rsvpIcon from '../assets/guests.png';
import invoiceIcon from '../assets/invoiceIcon.png';
import bgimage from '../assets/event.png'; // Background image

const Home = () => {
  const welcomeText = "Welcome to Planique.....";
  const fullText = "Planique is your all-in-one solution for organizing events, weddings, and conferences. Experience seamless planning, smooth tracking, and the best tools for managing every detail.";

  const featuresRef = useRef(null);
  const headerRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white relative">
      {/* Logo */}
      {/* <img
        src={logoImage}
        alt="PLANIQUE Logo"
        className="absolute h-auto top-6 right-6" // Position logo at top right corner
      /> */}

      <header className="w-full py-2.5 px-8 flex justify-between items-center bg-white absolute top-0 left-0 z-50" ref={headerRef}>
        <h1 className="text-3xl font-bold tracking-wide text-black" style={{ fontFamily: "'Breathing', cursive" }}>
          Planique
        </h1>
        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={scrollToTop}
            className="bg-transparent text-indigo-600 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            Home
          </button>
          <Link
            to="/tutorials"
            className="bg-transparent text-arial-600 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            Tutorials
          </Link>
        </div>
        <div>
          <Link to="/login" className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 mr-4 transition duration-200 ease-in-out">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-200 ease-in-out">Register</Link>
        </div>
      </header>

      {/* Background Section with Blur Effect */}
      <section className="flex-grow flex flex-col items-center justify-center p-6 text-center relative min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
        {/* Blur Effect */}
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>

        {/* Centered Text */}
        <div className="flex flex-col items-center max-w-3xl mx-auto mb-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Breathing', cursive" }}>
            <span className="text-white-300">{welcomeText}</span>
          </h2>
          {/* Directly Displaying Full Description */}
          <p className="max-w-xl text-lg md:text-xl leading-relaxed text-gray-200 mb-10">
            {fullText}
          </p>

          <button
            className="bg-yellow-300 text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition duration-200 ease-in-out animate-pulse"
          >
            <Link to="/register">Get Started</Link>
          </button>
        </div>
      </section>

      <section ref={featuresRef} className="bg-white text-indigo-900 w-full py-12 mt-10  px-8">
        <h3 className="text-2xl font-semibold text-center mb-8">Discover What Planique Can Do for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md text-center transition-transform duration-200 transform hover:scale-105">
            <img src={manageIcon} alt="Manage Icon" className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-4">Create & Manage Events</h4>
            <p className="text-gray-700">Effortlessly create events and manage details all in one place.</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md text-center transition-transform duration-200 transform hover:scale-105">
            <img src={budgetIcon} alt="Budget Icon" className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-4">Track Budgets & Vendors</h4>
            <p className="text-gray-700">Keep a close eye on budgets and easily manage vendor interactions.</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md text-center transition-transform duration-200 transform hover:scale-105">
            <img src={rsvpIcon} alt="RSVP Icon" className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-4">RSVP & Guest Management</h4>
            <p className="text-gray-700">Organize guest lists and monitor RSVP statuses in real-time.</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md text-center transition-transform duration-200 transform hover:scale-105">
            <img src={invoiceIcon} alt="Invoice Icon" className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-4">Generate Invoices & Reports</h4>
            <p className="text-gray-700">Efficiently generate and manage invoices and event reports.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
