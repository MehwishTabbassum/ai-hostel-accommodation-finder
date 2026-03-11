import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Phone, X } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  category: string;
  address: string;
  contact_number?: string;
  distance_km: number;
}

interface NearbyServicesResponse {
    hostel: {
        id: number;
        name: string;
    };
    nearby: Record<string, Service[]>;
}

const EssentialServicesPage: React.FC = () => {
  const [nearbyData, setNearbyData] = useState<Record<string, Service[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mock data exactly as in the screenshots
        const data: NearbyServicesResponse = {
            hostel: { id: 1, name: "Mock Hostel" },
            nearby: {
                grocery: [
                    { id: 101, name: "Fresh Mart", category: "grocery", address: "123 Main Street, Koramangala", contact_number: "+91 98765 43210", distance_km: 0.5 },
                    { id: 102, name: "Daily Needs Store", category: "grocery", address: "45 Park Road, Koramangala", contact_number: "+91 98765 43211", distance_km: 0.8 },
                    { id: 103, name: "SuperMart Express", category: "grocery", address: "78 MG Road, Koramangala", contact_number: "+91 98765 43212", distance_km: 1.2 }
                ],
                food: [
                    { id: 201, name: "Homely Meals", category: "food", address: "67 Food Street, Koramangala", contact_number: "+91 98765 43220", distance_km: 0.3 },
                    { id: 202, name: "Student's Kitchen", category: "food", address: "89 Mess Lane, Koramangala", contact_number: "+91 98765 43221", distance_km: 0.6 },
                    { id: 203, name: "Daily Tiffin Service", category: "food", address: "34 Hostel Road, Koramangala", contact_number: "+91 98765 43222", distance_km: 0.9 }
                ],
                laundry: [
                    { id: 301, name: "QuickWash Laundry", category: "laundry", address: "12 Clean Street, Koramangala", contact_number: "+91 98765 43230", distance_km: 0.4 },
                    { id: 302, name: "Fresh Laundry", category: "laundry", address: "56 Wash Road, Koramangala", contact_number: "+91 98765 43231", distance_km: 0.7 },
                    { id: 303, name: "Express Dry Cleaners", category: "laundry", address: "90 Service Lane, Koramangala", contact_number: "+91 98765 43232", distance_km: 1.0 }
                ],
                cafes: [
                    { id: 401, name: "Coffee Hub", category: "cafes", address: "23 Cafe Street, Koramangala", contact_number: "+91 98765 43240", distance_km: 0.2 },
                    { id: 402, name: "Student's Brew", category: "cafes", address: "45 Coffee Lane, Koramangala", contact_number: "+91 98765 43241", distance_km: 0.5 },
                    { id: 403, name: "The Study Cafe", category: "cafes", address: "67 Book Road, Koramangala", contact_number: "+91 98765 43242", distance_km: 0.8 }
                ],
                daily_need_stores: [
                    { id: 501, name: "Campus Convenience", category: "daily_need_stores", address: "202 Campus Dr", contact_number: "+91 98765 00000", distance_km: 0.1 }
                ]
            }
        };
        
        setNearbyData(data.nearby);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="p-20 text-center text-red-500 font-black text-xl">Error: {error}</div>
    </div>
  );

  const categories = {
    grocery: { title: "Grocery Stores", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80", color: "bg-blue-600" },
    food: { title: "Food Messes", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", color: "bg-emerald-500" },
    laundry: { title: "Laundry Services", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80", color: "bg-blue-600" },
    cafes: { title: "Cafes", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", color: "bg-emerald-500" },
    daily_need_stores: { title: "Daily Need Stores", image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80", color: "bg-blue-500" }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center max-w-7xl">
        <div className="mb-20">
          <div className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-full text-sm font-black mb-8 flex items-center gap-2 mx-auto w-fit uppercase tracking-widest">
            <span className="text-blue-500">✨</span> Local Services
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Everything You Need Nearby</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            We've mapped out the best grocery stores, messes, and laundries around your stay to make your student life easier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
          {Object.entries(categories).map(([key, info]) => {
            const count = nearbyData[key]?.length || 0;
            return (
              <div 
                key={key} 
                onClick={() => setSelectedCategory(key)}
                className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all cursor-pointer group hover:-translate-y-2"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={info.image} alt={info.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-8 text-center relative">
                  <div className={`w-16 h-16 rounded-2xl mx-auto ${info.color} flex items-center justify-center text-white text-2xl font-black shadow-xl border-4 border-white dark:border-slate-900 -mt-16 relative z-10 transition-transform group-hover:rotate-12`}>
                    →
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 mt-4">{info.title}</h3>
                  <p className="text-slate-500 dark:text-slate-500 text-sm font-black uppercase tracking-widest">{count} Locations</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setSelectedCategory(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-transparent dark:border-slate-800" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-10 flex items-center justify-between border-b border-gray-50 dark:border-slate-800">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {categories[selectedCategory as keyof typeof categories].title}
                </h2>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Available near your hostel</p>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400 dark:text-slate-500 active:scale-90"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 max-h-[65vh] overflow-y-auto space-y-6 custom-scrollbar">
              {nearbyData[selectedCategory]?.map((service) => (
                <div key={service.id} className="bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-700/50 rounded-3xl p-8 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/5 group">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.name}</h3>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter">{service.distance_km} km</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-slate-500 dark:text-slate-400">
                      <MapPin size={20} className="mt-1 flex-shrink-0 text-blue-500" />
                      <span className="text-lg font-bold">{service.address}</span>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100 dark:border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 cursor-pointer group/phone">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 group-hover/phone:scale-110 transition-transform">
                          <Phone size={18} />
                        </div>
                        <span className="text-lg font-black">{service.contact_number}</span>
                      </div>
                      <button className="bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-2 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
                        Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssentialServicesPage;