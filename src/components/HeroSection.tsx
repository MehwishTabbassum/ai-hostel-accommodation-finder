import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/hostels?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-slate-950 dark:to-slate-900 text-white py-24 px-4 text-center transition-colors duration-300">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-xl mb-8">
          Verified hostels, genuine reviews, and local services all in one place
        </p>
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by city or location..."
            className="w-full max-w-md p-4 rounded-xl text-gray-800 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-400 border border-transparent dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 bg-green-500 hover:bg-green-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
