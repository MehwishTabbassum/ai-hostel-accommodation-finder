import React from 'react';
import { Link } from 'react-router-dom';

interface HostelCardProps {
  id: number;
  name: string;
  location: string; // Assuming we'll get a location string or use a specific format
  price: number;
  rating: number;
  imageUrl: string;
  amenities: string[]; // Array of strings for amenities
}

const HostelCard: React.FC<HostelCardProps> = ({ id, name, location, price, rating, imageUrl, amenities }) => {
  return (
    <Link to={`/hostel/${id}`} className="block group transition-all duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden">
        <div className="relative overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
            <svg className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-gray-900 dark:text-white text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {location}
          </p>
          <div className="flex flex-wrap gap-2 text-xs mb-6">
            {amenities.map((amenity, index) => (
              <span key={index} className="px-3 py-1.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 rounded-lg font-bold uppercase tracking-wider">
                {amenity}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase">Starting from</span>
              <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">₹{price}<span className="text-sm font-bold text-gray-400">/mo</span></span>
            </div>
            <div className="bg-blue-600 text-white p-2.5 rounded-xl group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HostelCard;
