import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'react-typewriter-effect';
import eventImage from '../assets/eventImage.jpg';
import manageIcon from '../assets/manageIcon.png';
import budgetIcon from '../assets/budgetIcon.png';
import rsvpIcon from '../assets/guests.png';
import invoiceIcon from '../assets/invoiceIcon.png';
import bgimage from '../assets/event.png';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';

const Home = () => {
  const welcomeText = "Welcome to Planique";
  const fullText = "Planique is your all-in-one solution for organizing events, weddings, and conferences. Experience seamless planning, smooth tracking, and the best tools for managing every detail.";

  const featuresRef = useRef(null);
  const headerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    bgimage,
    img2,
    img3,
    img4,
    img5,
    img6
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-['Munich'] overflow-hidden">
      <header ref={headerRef} className="fixed w-full bg-slate-900/90 backdrop-blur-md shadow-md z-50 h-16">
        <div className="container mx-auto h-full px-6">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                <h1 className="text-xl font-black text-slate-900">P</h1>
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">Planique</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={scrollToTop} className="text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium">
                Home
              </button>
              <Link to="/tutorials" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium">
                Tutorials
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/login" className="px-3 py-1.5 text-sm text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="container-fluid px-0 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="relative overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={`w-full h-[600px] object-cover transition-all duration-700 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 absolute top-0 left-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentSlide ? 'bg-emerald-400 scale-110' : 'bg-white/80'
                    }`}
                  />
                ))}
              </div>
              <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-8 px-8">
              <h2 className="text-7xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent leading-tight tracking-tighter font-['Munich']">
                <Typewriter
                  text={welcomeText}
                  cursorColor="transparent"
                  typeSpeed={70}
                />
              </h2>
              <p className="text-2xl text-slate-300 leading-relaxed font-light">
                <Typewriter
                  text={fullText}
                  cursorColor="transparent"
                  typeSpeed={30}
                  startDelay={2000}
                />
              </p>
              <Link to="/register">
                <button className="group px-14 py-6 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 rounded-xl text-xl font-bold hover:from-emerald-300 hover:to-teal-300 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  Get Started
                  <span className="inline-block ml-3 transform group-hover:translate-x-2 transition-transform duration-200">→</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-8">
            <h3 className="text-6xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-24 tracking-tight font-['Munich']">Discover What Planique Can Do for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="group p-10 bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 border border-slate-700">
                <img src={manageIcon} alt="Manage Icon" className="w-24 h-24 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                <h4 className="text-2xl font-bold text-slate-100 mb-4">Create & Manage Events</h4>
                <p className="text-slate-300 text-lg">Effortlessly create events and manage details all in one place.</p>
              </div>
              <div className="group p-10 bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 border border-slate-700">
                <img src={budgetIcon} alt="Budget Icon" className="w-24 h-24 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                <h4 className="text-2xl font-bold text-slate-100 mb-4">Track Budgets & Vendors</h4>
                <p className="text-slate-300 text-lg">Keep a close eye on budgets and easily manage vendor interactions.</p>
              </div>
              <div className="group p-10 bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 border border-slate-700">
                <img src={rsvpIcon} alt="RSVP Icon" className="w-24 h-24 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                <h4 className="text-2xl font-bold text-slate-100 mb-4">RSVP & Guest Management</h4>
                <p className="text-slate-300 text-lg">Organize guest lists and monitor RSVP statuses in real-time.</p>
              </div>
              <div className="group p-10 bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 border border-slate-700">
                <img src={invoiceIcon} alt="Invoice Icon" className="w-24 h-24 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                <h4 className="text-2xl font-bold text-slate-100 mb-4">Generate Invoices & Reports</h4>
                <p className="text-slate-300 text-lg">Efficiently generate and manage invoices and event reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
