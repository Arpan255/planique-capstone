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
import '../assets/fonts.css';

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black font-poppins overflow-x-hidden">
      <header ref={headerRef} className="fixed w-full bg-black/90 backdrop-blur-xl shadow-lg z-50 h-16 border-b border-teal-500/20 transition-all duration-300">
        <div className="container mx-auto h-full px-4">
          <div className="flex items-center justify-between h-full">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <h1 className="text-xl font-bold text-white">P</h1>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Planique</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" onClick={scrollToTop} className="text-base text-teal-400 hover:text-teal-400 transition-all duration-300">
                Home
              </Link>
              <Link to="/tutorial" className="text-base text-teal-400 hover:text-teal-400 transition-all duration-300">
                Need Ideas?
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/login" className="px-4 py-1.5 text-base text-teal-300 hover:text-teal-400 border border-teal-500/30 rounded-lg hover:border-teal-500 transition-all duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-1.5 text-base bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="relative min-h-screen flex items-center pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-gray-900/95 z-10"></div>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                <Typewriter
                  text={welcomeText}
                  cursorColor="transparent"
                  typeSpeed={70}
                />
              </h2>
              <div className="text-base text-gray-300 leading-relaxed">
                <Typewriter
                  text={fullText}
                  cursorColor="transparent"
                  typeSpeed={30}
                  startDelay={2000}
                />
              </div>
              <Link to="/register">
                <button className="px-8 py-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                  Get Started
                  <span className="inline-block ml-2">→</span>
                </button>
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={`w-full h-[500px] object-cover transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                  }`}
                  style={{transform: `scale(${index === currentSlide ? '1' : '1.1'})`}}
                />
              ))}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-teal-400' : 'bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-12">Discover What Planique Can Do for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: manageIcon, title: "Create & Manage Events", desc: "Effortlessly create events and manage details all in one place." },
                { icon: budgetIcon, title: "Track Budgets & Vendors", desc: "Keep a close eye on budgets and easily manage vendor interactions." },
                { icon: rsvpIcon, title: "RSVP & Guest Management", desc: "Organize guest lists and monitor RSVP statuses in real-time." },
                { icon: invoiceIcon, title: "Generate Invoices & Reports", desc: "Efficiently generate and manage invoices and event reports." }
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-gray-900/50 backdrop-blur-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-teal-500/20">
                  <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-4 transition-all duration-300" />
                  <h4 className="text-lg font-medium text-teal-400 mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <style>{`
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
