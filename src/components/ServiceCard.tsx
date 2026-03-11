import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  name: string;
  category: string;
  address: string;
  contactNumber?: string;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, category, address, contactNumber, imageUrl }) => {
  const defaultImageUrl = `https://via.placeholder.com/400x300?text=${category}+Service`;

  return (
    <Link to={`/service/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img src={imageUrl || defaultImageUrl} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
          <p className="text-sm text-gray-700">{address}</p>
          {contactNumber && <p className="text-sm text-gray-700">Contact: {contactNumber}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
