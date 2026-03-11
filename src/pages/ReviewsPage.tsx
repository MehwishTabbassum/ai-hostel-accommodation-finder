import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { MessageSquare, Star, X, MapPin, Plus } from 'lucide-react';

interface Review {
  id: number;
  hostel_name: string;
  rating: number;
  comment: string;
  date: string;
  time_ago: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    hostel_name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mock reviews data
        const data: Review[] = [
          {
            id: 1,
            hostel_name: "Sunrise Hostel",
            rating: 4.5,
            comment: "Great place to stay! The amenities are excellent and the location is perfect. Staff is very cooperative and helpful.",
            date: new Date().toISOString(),
            time_ago: "2 days ago"
          },
          {
            id: 2,
            hostel_name: "Urban Living Hostel",
            rating: 4.7,
            comment: "Amazing experience! Clean rooms, good food, and the AC works perfectly. Would definitely recommend to students.",
            date: new Date().toISOString(),
            time_ago: "1 week ago"
          },
          {
            id: 3,
            hostel_name: "Elite Boys PG",
            rating: 4.9,
            comment: "Luxurious stay with premium facilities. The gym and study room are top-notch. Completely worth the price.",
            date: new Date().toISOString(),
            time_ago: "3 days ago"
          },
          {
            id: 4,
            hostel_name: "Green Valley Hostel",
            rating: 3.8,
            comment: "Good budget option. The garden area is very peaceful. Maintenance could be slightly better but reasonably priced.",
            date: new Date().toISOString(),
            time_ago: "5 days ago"
          }
        ];
        
        setReviews(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReviews();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission: Review = {
      id: Date.now(),
      hostel_name: formData.hostel_name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString(),
      time_ago: "Just now"
    };
    setReviews([newSubmission, ...reviews]);
    setFormData({ hostel_name: '', rating: 5, comment: '' });
    handleCloseModal();
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#eef5ff] dark:bg-blue-500/10 text-[#3b82f6] dark:text-blue-400 px-5 py-2 rounded-full text-sm font-black mb-8 uppercase tracking-widest">
            <MessageSquare size={16} />
            Anonymous Reviews
          </div>
          <h1 className="text-6xl font-black text-[#0f172a] dark:text-white mb-8 tracking-tighter">What Residents Say</h1>
          <p className="text-[#64748b] dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Discover real, unfiltered feedback from students living in verified hostels to help you find your next home.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-[#e2e8f0] dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col h-full group">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-[#0f172a] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{review.hostel_name}</h3>
                <div className="flex items-center gap-2 bg-[#3b82f6] text-white px-4 py-2 rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20">
                  <Star size={16} fill="currentColor" />
                  {review.rating.toFixed(1)}
                </div>
              </div>
              
              <p className="text-[#475569] dark:text-slate-400 text-lg leading-relaxed flex-grow mb-10 font-medium">
                "{review.comment}"
              </p>
              
              <div className="pt-8 border-t border-[#f1f5f9] dark:border-slate-800 text-[#64748b] dark:text-slate-500 text-sm font-black uppercase tracking-widest flex items-center justify-between">
                <span>Verified Resident</span>
                <span>{review.time_ago}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
            <button 
              onClick={handleOpenModal}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-3 mx-auto"
            >
                <Plus size={24} />
                Write a Review
            </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-transparent dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-black text-[#0f172a] dark:text-white tracking-tighter">New Review</h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400 dark:text-slate-500 active:scale-90"
                >
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-3">Hostel Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.hostel_name}
                    onChange={e => setFormData({...formData, hostel_name: e.target.value})}
                    placeholder="Which hostel are you reviewing?"
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-3">Your Rating</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({...formData, rating: num})}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          formData.rating >= num 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-110' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Star size={22} fill={formData.rating >= num ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-3">Detailed Experience</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.comment}
                    onChange={e => setFormData({...formData, comment: e.target.value})}
                    placeholder="Tell us about the rooms, food, and staff..."
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none font-medium leading-relaxed"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-5 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 mt-4"
                >
                  Post Anonymous Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
