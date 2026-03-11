import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-slate-950 p-4 text-white shadow-md w-full transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center w-full max-w-7xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-white dark:text-blue-400 shrink-0">
            HostelHub
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/hostels" className="text-white hover:text-blue-200 transition-colors">Verified Hostels</Link>
            <Link to="/reviews" className="text-white hover:text-blue-200 transition-colors">Reviews</Link>
            <Link to="/services" className="text-white hover:text-blue-200 transition-colors">Services</Link>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
          </button>

          <div className="hidden sm:flex gap-3">
            <Link to="/login" className="bg-white text-blue-600 px-5 py-2.5 rounded-xl hover:bg-gray-100 font-bold transition-all shadow-sm">Login</Link>
            <Link to="/signup" className="border border-white/40 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 font-bold transition-all">Signup</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
