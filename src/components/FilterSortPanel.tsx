import React, { useState } from 'react';

interface FilterSortPanelProps {
  onFilterChange: (filters: {
    min_price?: number;
    max_price?: number;
    room_type?: string;
    amenities?: string[];
    min_rating?: number;
    sort_by?: string;
  }) => void;
  onSearch: (city: string) => void;
}

const FilterSortPanel: React.FC<FilterSortPanelProps> = ({ onFilterChange, onSearch }) => {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [roomType, setRoomType] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  const handleApplyFilters = () => {
    onFilterChange({
      min_price: minPrice === '' ? undefined : Number(minPrice),
      max_price: maxPrice === '' ? undefined : Number(maxPrice),
      room_type: roomType || undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      min_rating: minRating === '' ? undefined : Number(minRating),
      sort_by: sortBy || undefined,
    });
  };

  const handleSearchCity = () => {
    onSearch(citySearch);
  };

  const handleAmenityToggle = (item: string) => {
    setSelectedAmenities(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
        {(minPrice !== '' || maxPrice !== '' || roomType !== '' || selectedAmenities.length > 0) && (
          <button 
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
              setRoomType('');
              setSelectedAmenities([]);
              setMinRating('');
              onFilterChange({});
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-300 uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-slate-800 pb-2">Price Range</h3>
        
        <div className="relative pt-1 w-full mb-6">
          <input 
            type="range" 
            min="5000" 
            max="15000" 
            step="100"
            value={maxPrice === '' ? 15000 : maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${( ( (maxPrice === '' ? 15000 : maxPrice) - 5000) / 10000) * 100}%, #e2e8f0 ${( ( (maxPrice === '' ? 15000 : maxPrice) - 5000) / 10000) * 100}%, #e2e8f0 100%)`
            }}
          />
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              background: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }
            .dark input[type='range']::-webkit-slider-thumb {
              border-color: #0f172a;
              background: #60a5fa;
            }
          `}</style>
        </div>

        <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-4">
          <span>₹5,000</span>
          <span>₹15,000</span>
        </div>
        <div className="text-center bg-blue-50 dark:bg-blue-900/20 py-2 rounded-xl text-blue-600 dark:text-blue-400 font-extrabold text-lg transition-colors">
          ₹{maxPrice === '' ? '15,000' : maxPrice.toLocaleString()}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-300 uppercase tracking-widest mb-4 border-b border-gray-50 dark:border-slate-800 pb-2">Amenities</h3>
        <div className="grid grid-cols-1 gap-3">
          {['WiFi', 'AC', 'Food', 'Laundry', 'Parking'].map(item => (
            <label key={item} className="flex items-center cursor-pointer group p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                name="amenities"
                value={item}
                checked={selectedAmenities.includes(item)}
                onChange={() => handleAmenityToggle(item)}
                className="w-5 h-5 rounded text-blue-600 dark:text-blue-400 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-500 transition-all"
              />
              <span className="ml-4 text-sm text-gray-700 dark:text-slate-400 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-300 uppercase tracking-widest mb-4 border-b border-gray-50 dark:border-slate-800 pb-2">Room Type</h3>
        <div className="grid grid-cols-1 gap-3">
          {['Single', 'Double', 'Triple', 'Shared'].map(type => (
            <label key={type} className="flex items-center cursor-pointer group p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <input
                type="radio"
                name="roomType"
                value={type}
                checked={roomType === type}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-5 h-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-blue-500 transition-all"
              />
              <span className="ml-4 text-sm text-gray-700 dark:text-slate-400 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-2xl transition duration-200 shadow-lg shadow-blue-100 dark:shadow-none"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSortPanel;
