import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatisticsSection from '../components/StatisticsSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <StatisticsSection />
    </div>
  );
};

export default LandingPage;
