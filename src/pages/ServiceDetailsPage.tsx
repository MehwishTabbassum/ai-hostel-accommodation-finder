import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface ServiceDetails {
  id: number;
  name: string;
  category: string;
  address: string;
  contact_number?: string;
  description?: string;
  image_url?: string;
  location: { lat: number; lon: number };
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/hostels/facilities/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ServiceDetails = await response.json();
        setService(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) return <div>Loading service details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!service) return <div>Service not found.</div>;

  const defaultImageUrl = `https://via.placeholder.com/600x400?text=${service.category}+Image`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{service.name}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <img 
            src={service.image_url || defaultImageUrl} 
            alt={service.name} 
            className="w-full h-64 object-cover rounded-lg mb-4" 
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {service.category.charAt(0).toUpperCase() + service.category.slice(1)}</p>
          <p className="text-gray-700 mb-2"><strong>Address:</strong> {service.address}</p>
          {service.contact_number && <p className="text-gray-700 mb-2"><strong>Contact:</strong> {service.contact_number}</p>}
          {service.description && <p className="text-gray-700 mb-2"><strong>Description:</strong> {service.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
