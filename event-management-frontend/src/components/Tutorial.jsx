import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_KEY = 'AIzaSyDLK4BMsbTpUgkO9a4PVl2G0pVvmASppxg';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Tutorials', 
    href: '/tutorials',
  },
];

const Tutorial = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const headerRef = useRef(null);

  const searchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=tips for organizing ${searchTerm}&type=video&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  const handleVideoClick = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank'); // Open in new tab instead of navigating away
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <header ref={headerRef} className="fixed w-full bg-black/90 backdrop-blur-xl shadow-lg z-50 h-20 border-b border-teal-500/20 transition-all duration-300 hover:bg-black/95 hover:shadow-teal-500/20 hover:shadow-2xl hover:border-teal-400/30 group">
        <div className="container mx-auto h-full px-8">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500">
                <h1 className="text-2xl font-black text-white">P</h1>
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">Planique</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              {/* <button onClick={scrollToTop} className="text-base text-gray-300 hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110">
                Home
              </button> */}
              <Link to="/tutorial" className="text-base text-gray-300 hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110">
                Tutorials
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-6 py-2 text-base text-gray-300 hover:text-teal-400 font-medium border border-teal-500/30 rounded-xl hover:border-teal-500 transition-all duration-300 hover:scale-105">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2.5 text-base bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-teal-500/20 hover:scale-105 transition-all duration-500">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 pt-32">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Find Event Planning Inspiration</h1>

        <div className="flex items-center justify-center mb-12">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter event type (e.g., wedding, conference)"
            className="w-full max-w-xl p-4 bg-gray-900/50 border border-teal-500/30 rounded-l-xl text-gray-300 focus:outline-none focus:border-teal-500"
          />
          <button 
            onClick={searchVideos} 
            className="p-4 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-r-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
          >
            <FaSearch size={20} />
          </button>
        </div>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-teal-500/20 hover:border-teal-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-200 line-clamp-2">{video.snippet.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{video.snippet.description}</p>
                <button
                  onClick={() => handleVideoClick(video.id.videoId)}
                  className="w-full py-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
                >
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;