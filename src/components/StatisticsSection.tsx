import React from 'react';

const StatisticsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 dark:bg-slate-900/50 py-16 px-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-around items-center flex-wrap gap-8">
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-transparent dark:border-slate-700/50 min-w-[200px] transition-all">
          <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">500+</p>
          <p className="text-lg font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Hostels</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-transparent dark:border-slate-700/50 min-w-[200px] transition-all">
          <p className="text-5xl font-extrabold text-green-500 dark:text-green-400 mb-2">10K+</p>
          <p className="text-lg font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Reviews</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-transparent dark:border-slate-700/50 min-w-[200px] transition-all">
          <p className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">50+</p>
          <p className="text-lg font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Cities</p>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
