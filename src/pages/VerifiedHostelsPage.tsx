import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import HostelCard from '../components/HostelCard';
import FilterSortPanel from '../components/FilterSortPanel'; // Import FilterSortPanel
import { useNavigate, useLocation } from 'react-router-dom';

interface Hostel {
  id: number;
  name: string;
  location: { lat: number; lon: number };
  price: number;
  rating: number;
  amenities: string;
  room_types: string;
  image_gallery: string;
  check_in_time: string;
  check_out_time: string;
  distance_m?: number;
}

const VerifiedHostelsPage: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Filter and Sort states
  const [filters, setFilters] = useState({
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    room_type: undefined as string | undefined,
    amenities: undefined as string[] | undefined,
    min_rating: undefined as number | undefined,
    sort_by: undefined as string | undefined,
  });
  const [currentSearchLatLon, setCurrentSearchLatLon] = useState<{ lat: number; lon: number } | null>(null);

  const fetchHostels = useCallback(async (currentFilters: typeof filters, searchLatLon: typeof currentSearchLatLon) => {
    try {
      setLoading(true);
      
      let url = new URL('http://localhost:8000/hostels');
      
      // Add location parameters if available (from search or default)
      if (searchLatLon) {
        url.searchParams.append('lat', searchLatLon.lat.toString());
        url.searchParams.append('lon', searchLatLon.lon.toString());
        url.searchParams.append('radius', '50000'); // Default radius if location is provided
      } else {
        // Default location if no city search is active
        url.searchParams.append('lat', '37.7749'); // San Francisco
        url.searchParams.append('lon', '-122.4194');
        url.searchParams.append('radius', '50000');
      }

      // Add filter parameters
      if (currentFilters.min_price !== undefined) url.searchParams.append('min_price', currentFilters.min_price.toString());
      if (currentFilters.max_price !== undefined) url.searchParams.append('max_price', currentFilters.max_price.toString());
      if (currentFilters.room_type) url.searchParams.append('room_type', currentFilters.room_type);
      if (currentFilters.amenities) url.searchParams.append('amenities', currentFilters.amenities.join(','));
      if (currentFilters.min_rating !== undefined) url.searchParams.append('min_rating', currentFilters.min_rating.toString());
      if (currentFilters.sort_by) url.searchParams.append('sort_by', currentFilters.sort_by);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // All Mock data
      const allMockHostels: Hostel[] = [
        {
          id: 1,
          name: "Sunrise PG",
          location: { lat: 37.77, lon: -122.41 },
          price: 8500,
          rating: 4.2,
          amenities: "WiFi, Food, Laundry",
          room_types: "Double",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "12:00",
          check_out_time: "11:00",
        },
        {
          id: 2,
          name: "Green Valley Hostel",
          location: { lat: 37.76, lon: -122.43 },
          price: 6000,
          rating: 3.8,
          amenities: "WiFi, AC",
          room_types: "Shared",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "14:00",
          check_out_time: "12:00",
        },
        {
          id: 3,
          name: "Elite Boys PG",
          location: { lat: 37.79, lon: -122.40 },
          price: 15000,
          rating: 4.9,
          amenities: "WiFi, Food, Laundry, AC, Gym",
          room_types: "Single",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "10:00",
          check_out_time: "10:00",
        },
        {
          id: 4,
          name: "Urban Living",
          location: { lat: 37.75, lon: -122.42 },
          price: 11000,
          rating: 4.6,
          amenities: "WiFi, Food, AC, Parking",
          room_types: "Single, Double",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1512918766671-ed6a07be061f?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "12:00",
          check_out_time: "11:00",
        },
        {
          id: 5,
          name: "Lakeview Stay",
          location: { lat: 37.80, lon: -122.41 },
          price: 9000,
          rating: 4.0,
          amenities: "WiFi, Food, Laundry, Garden",
          room_types: "Triple, Shared",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "01:00 PM",
          check_out_time: "11:00 AM",
        },
        {
          id: 6,
          name: "City Center Hostel",
          location: { lat: 37.78, lon: -122.40 },
          price: 7500,
          rating: 4.3,
          amenities: "WiFi, AC, Cafe",
          room_types: "Shared",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "02:00 PM",
          check_out_time: "12:00 PM",
        },
        {
          id: 7,
          name: "Royal Residency",
          location: { lat: 37.77, lon: -122.39 },
          price: 18000,
          rating: 4.8,
          amenities: "WiFi, AC, Food, Laundry, Gym, Pool",
          room_types: "Single",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "12:00 PM",
          check_out_time: "11:00 AM",
        },
        {
          id: 8,
          name: "Student's Hub",
          location: { lat: 37.76, lon: -122.44 },
          price: 5500,
          rating: 3.5,
          amenities: "WiFi, Laundry",
          room_types: "Dorm",
          image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800"]),
          check_in_time: "14:00",
          check_out_time: "10:00",
        }
      ];

      // Client-side filtering
      let filtered = allMockHostels;

      if (currentFilters.max_price !== undefined) {
        filtered = filtered.filter(h => h.price <= currentFilters.max_price!);
      }
      if (currentFilters.room_type) {
        filtered = filtered.filter(h => h.room_types.includes(currentFilters.room_type!));
      }
      if (currentFilters.amenities && currentFilters.amenities.length > 0) {
        filtered = filtered.filter(h => 
          currentFilters.amenities!.every(amenity => h.amenities.split(', ').includes(amenity))
        );
      }

      setHostels(filtered);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check for city search query parameters from LandingPage
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    
    if (city) {
      // Placeholder for geocoding API to get lat/lon from city name
      // For now, we'll use a fixed lat/lon for "San Francisco" if that's the search, or default
      if (city.toLowerCase() === 'san francisco') {
        setCurrentSearchLatLon({ lat: 37.7749, lon: -122.4194 });
      } else {
        // Fallback to default if city is not recognized or no geocoding API
        setCurrentSearchLatLon(null);
      }
      // You might want to update URL with lat/lon for direct linking
    } else {
      setCurrentSearchLatLon(null); // No city search
    }
  }, [location.search]);

  useEffect(() => {
    fetchHostels(filters, currentSearchLatLon);
  }, [filters, currentSearchLatLon, fetchHostels]); // Re-fetch when filters or city changes

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleCitySearch = (city: string) => {
    // This will trigger the useEffect for location.search
    navigate(`/hostels?city=${city}`); 
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <p className="text-xl text-red-500 font-bold">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 py-16 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Featured Listings
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Verified Hostels & PGs</h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-2 font-medium">
            Find your perfect stay from our curated collection of verified accommodations
          </p>
          {location.search.includes('city=') && (
            <p className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl py-4 uppercase tracking-widest break-words max-w-4xl mx-auto">
              Showing results for: {new URLSearchParams(location.search).get('city')}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <FilterSortPanel onFilterChange={handleFilterChange} onSearch={handleCitySearch} />
          </div>

          {/* Results Area */}
          <div className="w-full lg:w-3/4">
            {hostels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {hostels.map((hostel) => (
                  <HostelCard
                    key={hostel.id}
                    id={hostel.id}
                    name={hostel.name}
                    location={`${hostel.location.lat.toFixed(2)}, ${hostel.location.lon.toFixed(2)}`}
                    price={hostel.price || 0}
                    rating={hostel.rating || 0}
                    imageUrl={hostel.image_gallery ? JSON.parse(hostel.image_gallery)[0] : "https://via.placeholder.com/400x300?text=Hostel+Image"}
                    amenities={hostel.amenities ? hostel.amenities.split(',').map(a => a.trim()) : []}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                <div className="text-center">
                  <h3 className="text-xl font-medium text-slate-700 mb-2">No hostels found matching your criteria</h3>
                  <p className="text-slate-500">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedHostelsPage;
