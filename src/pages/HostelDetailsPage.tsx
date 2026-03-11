import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin } from 'lucide-react';

interface HostelDetails {
  id: number;
  name: string;
  price: number;
  rating: number;
  amenities: string; // Comma-separated string
  room_types: string; // Comma-separated string
  image_gallery: string; // JSON string of image URLs
  check_in_time: string;
  check_out_time: string;
  location: { lat: number; lon: number };
}

interface Review {
  id: number;
  user_name: string | null;
  rating: number;
  comment: string | null;
  date: string;
}

const HostelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hostel, setHostel] = useState<HostelDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Centralized mock data for details (matches VerifiedHostelsPage)
        const allHostels: HostelDetails[] = [
          {
            id: 1,
            name: "Sunrise PG",
            price: 8500,
            rating: 4.2,
            amenities: "WiFi, Food, Laundry",
            room_types: "Double",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "12:00 PM",
            check_out_time: "11:00 AM",
            location: { lat: 37.77, lon: -122.41 },
          },
          {
            id: 2,
            name: "Green Valley Hostel",
            price: 6000,
            rating: 3.8,
            amenities: "WiFi, AC",
            room_types: "Shared",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "02:00 PM",
            check_out_time: "12:00 PM",
            location: { lat: 37.76, lon: -122.43 },
          },
          {
            id: 3,
            name: "Elite Boys PG",
            price: 15000,
            rating: 4.9,
            amenities: "WiFi, Food, Laundry, AC, Gym",
            room_types: "Single",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "10:00 AM",
            check_out_time: "10:00 AM",
            location: { lat: 37.79, lon: -122.40 },
          },
          {
            id: 4,
            name: "Urban Living",
            price: 11000,
            rating: 4.6,
            amenities: "WiFi, Food, AC, Parking",
            room_types: "Single, Double",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1512918766671-ed6a07be061f?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "12:00 PM",
            check_out_time: "11:00 AM",
            location: { lat: 37.75, lon: -122.42 },
          },
          {
            id: 5,
            name: "Lakeview Stay",
            price: 9000,
            rating: 4.0,
            amenities: "WiFi, Food, Laundry, Garden",
            room_types: "Triple, Shared",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "01:00 PM",
            check_out_time: "11:00 AM",
            location: { lat: 37.80, lon: -122.41 },
          },
          {
            id: 6,
            name: "City Center Hostel",
            price: 7500,
            rating: 4.3,
            amenities: "WiFi, AC, Cafe",
            room_types: "Shared",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "02:00 PM",
            check_out_time: "12:00 PM",
            location: { lat: 37.78, lon: -122.40 },
          },
          {
            id: 7,
            name: "Royal Residency",
            price: 18000,
            rating: 4.8,
            amenities: "WiFi, AC, Food, Laundry, Gym, Pool",
            room_types: "Single",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "12:00 PM",
            check_out_time: "11:00 AM",
            location: { lat: 37.77, lon: -122.39 },
          },
          {
            id: 8,
            name: "Student's Hub",
            price: 5500,
            rating: 3.5,
            amenities: "WiFi, Laundry",
            room_types: "Dorm",
            image_gallery: JSON.stringify(["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800"]),
            check_in_time: "02:00 PM",
            check_out_time: "10:00 AM",
            location: { lat: 37.76, lon: -122.44 },
          }
        ];

        const hostelData = allHostels.find(h => h.id === parseInt(id || '1')) || allHostels[0];
        setHostel(hostelData);

        // Mock reviews data
        const reviewsData: Review[] = [
          {
            id: 1,
            user_name: "John Doe",
            rating: 4,
            comment: "Great place, clean rooms and good food.",
            date: new Date().toISOString()
          },
          {
            id: 2,
            user_name: "Jane Smith",
            rating: 5,
            comment: "Absolutely loved my stay here! Highly recommended.",
            date: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setReviews(reviewsData);

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id]);

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
  if (!hostel) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <p className="text-xl text-gray-500 font-bold">Hostel not found.</p>
    </div>
  );

  const images = hostel.image_gallery ? JSON.parse(hostel.image_gallery) : [];
  const amenitiesList = hostel.amenities ? hostel.amenities.split(',').map(a => a.trim()) : [];
  const roomTypesList = hostel.room_types ? hostel.room_types.split(',').map(r => r.trim()) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Image Section */}
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        {images.length > 0 ? (
          <img 
            src={images[0]} 
            alt={hostel.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-black mb-6 drop-shadow-2xl">{hostel.name}</h1>
            <div className="flex items-center gap-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-lg shadow-xl flex items-center gap-2">
                <span className="text-yellow-400">★</span> {hostel.rating.toFixed(1)}
              </span>
              <span className="text-xl font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">Verified Hostel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Details Section */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">About this stay</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-colors">
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Price</p>
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{hostel.price.toLocaleString()}<span className="text-sm">/mo</span></p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Room Types</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{roomTypesList.join(', ')}</p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Check-in</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{hostel.check_in_time}</p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Check-out</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{hostel.check_out_time}</p>
                </div>
              </div>
            </section>

            {/* Amenities Section */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenitiesList.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-4 p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 hover:border-blue-500 dark:hover:border-blue-400 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform font-bold">
                      ✓
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Image Gallery */}
            {images.length > 1 && (
              <section>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Gallery</h2>
                <div className="grid grid-cols-2 gap-6">
                  {images.slice(1).map((img: string, index: number) => (
                    <div key={index} className="overflow-hidden rounded-[2rem] shadow-xl aspect-video group">
                      <img 
                        src={img} 
                        alt={`${hostel.name} ${index + 2}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section className="pt-16 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Resident Reviews ({reviews.length})</h2>
              <div className="space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="p-10 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 px-3 py-1 rounded-lg text-white font-bold text-sm">
                          {review.rating} ★
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-lg">{review.user_name || "Anonymous Resident"}</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-tighter">{new Date(review.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Booking Interest</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">Our residents love it here! Contact the manager to check availability or schedule a tour.</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${hostel.location.lat},${hostel.location.lon}`, '_blank')}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-sm"
                >
                  <MapPin size={24} />
                  Locate on Map
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                  Call Manager
                </button>
                <button className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 py-5 rounded-[1.5rem] font-black text-lg transition-all">
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HostelDetailsPage;
