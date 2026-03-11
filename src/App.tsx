import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VerifiedHostelsPage from './pages/VerifiedHostelsPage';
import HostelDetailsPage from './pages/HostelDetailsPage';
import ReviewsPage from './pages/ReviewsPage';
import EssentialServicesPage from './pages/EssentialServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // Import new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/hostels" element={<VerifiedHostelsPage />} />
      <Route path="/hostel/:id" element={<HostelDetailsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/services" element={<EssentialServicesPage />} />
      <Route path="/service/:id" element={<ServiceDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* Other routes will be added here */}
    </Routes>
  );
}

export default App;