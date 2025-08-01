import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerificationBadge from '../components/VerificationBadge';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Star, MapPin, Briefcase, PlayCircle } from 'lucide-react';

const HelperProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [helper, setHelper] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchHelperData = async () => {
      try {
        window.scrollTo(0, 0);
        setLoading(true);
        setError(null);
        setBookingSuccess(false);

        const [profileRes, reviewsRes] = await Promise.all([
            api.get(`/helpers/${id}`),
            api.get(`/reviews/helper/${id}`)
        ]);
        
        setHelper(profileRes.data.data);
        setReviews(reviewsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch helper data", err);
        setError("Could not load helper profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHelperData();
  }, [id]);

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      navigate('/dashboard');
    }, 3000);
  };

  const canBook = user && user.role === 'USER' && user._id !== helper?._id;
  const availabilityStyle = helper?.availability === 'Available' 
        ? 'bg-green-500/20 text-green-300' 
        : 'bg-red-500/20 text-red-300';

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Navbar />
        <main className="flex-grow py-20 text-center text-lg text-[var(--color-text-muted)]">
          Loading Profile...
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !helper) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Navbar />
        <main className="flex-grow py-20 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-strong)]">{error || "Helper not found."}</h1>
          <Link to="/find" className="mt-4 inline-block text-[var(--color-primary)] hover:underline">Back to search</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <BookingModal
        helper={helper}
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onBookingSuccess={handleBookingSuccess}
      />
      <div className="bg-[var(--color-bg)]">
        <Navbar />
        <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {bookingSuccess && (
                <div className="mb-8 rounded-md bg-green-500/20 p-4 text-center text-green-300">
                    Booking request sent! Redirecting you to your dashboard...
                </div>
            )}
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-1 lg:sticky lg:top-28 self-start">
              <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl">
                 <div className="flex flex-col items-center text-center">
                    <img className="h-40 w-40 rounded-full object-cover shadow-lg" src={helper.profileImage || 'https://via.placeholder.com/160'} alt={helper.fullName} />
                    <h1 className="mt-4 text-3xl font-bold text-[var(--color-text-strong)]">{helper.fullName}</h1>
                    <p className="mt-1 text-xl font-medium text-[var(--color-primary)]">{helper.primaryService}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <VerificationBadge type="police" isVerified={helper.isVerified?.police} />
                        <VerificationBadge type="id" isVerified={helper.isVerified?.id} />
                    </div>
                </div>
                <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6 text-[var(--color-text-muted)] space-y-3">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 flex-shrink-0" />
                        <span>{helper.city || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 flex-shrink-0" />
                        <span>{helper.experience || 0} years experience</span>
                    </div>
                    <div className={`flex items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${availabilityStyle}`}>
                       <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${helper?.availability === 'Available' ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${helper?.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       </span>
                       {helper.availability}
                    </div>
                </div>
                 <div className="mt-6">
                    {canBook ? (
                        <button onClick={() => setShowBookingModal(true)} className="w-full btn btn-primary">
                            Book Interview
                        </button>
                    ) : (
                        <p className="text-center text-sm text-[var(--color-text-muted)] p-2 bg-[var(--color-bg-component-subtle)] rounded-md">
                            {user ? (user._id === helper._id ? 'This is your profile.' : 'Log in as a user to book.') : 'Login to book an interview.'}
                        </p>
                    )}
                 </div>
              </div>
            </div>

            <div className="mt-12 lg:col-span-2 lg:mt-0">
              <div className="space-y-10">
                {helper.introVideo && (
                  <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                    <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">Video Introduction</h2>
                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg">
                      {!showVideo ? (
                        <>
                          <img src={helper.coverImage || 'https://via.placeholder.com/1280x720'} alt="Video thumbnail" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/30"></div>
                          <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center text-white transition-transform hover:scale-110"><PlayCircle size={80} className="drop-shadow-lg" /></button>
                        </>
                      ) : (
                        <iframe src={helper.introVideo + '?autoplay=1'} title="Introduction Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="h-full w-full"></iframe>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                  <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">About Me</h2>
                  <p className="mt-4 text-[var(--color-text)] leading-relaxed">{helper.description || 'No description provided.'}</p>
                </div>

                {helper.skills?.length > 0 && (
                  <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                     <h3 className="text-2xl font-semibold text-[var(--color-text-strong)]">Skills</h3>
                    <div className="mt-4 flex flex-wrap gap-3">{helper.skills.map(skill => (<span key={skill} className="rounded-full bg-teal-100/70 dark:bg-teal-500/20 px-4 py-1.5 text-sm font-medium text-teal-800 dark:text-teal-200">{skill}</span>))}</div>
                  </div>
                )}

                {helper.galleryImages && helper.galleryImages.length > 0 && (
                     <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                         <h3 className="text-2xl font-semibold text-[var(--color-text-strong)]">My Gallery</h3>
                         <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                             {helper.galleryImages.map((imgUrl, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                                    <img src={imgUrl} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover transition-transform hover:scale-105" />
                                </div>
                             ))}
                         </div>
                     </div>
                 )}
                
                <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                  <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">Reviews & Ratings</h2>
                  <div className="mt-4 flex items-center gap-4">
                     <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-[var(--color-text-strong)]">{helper.averageRating?.toFixed(1) || '0.0'}</span>
                        <span className="text-xl text-[var(--color-text-muted)]">/ 5</span>
                    </div>
                    <div>
                        <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(helper.averageRating) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" />)}</div>
                        <p className="text-sm text-[var(--color-text-muted)]">Based on {reviews.length} reviews</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-8 border-t border-[var(--color-border-subtle)] pt-8">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review._id}>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <img src={review.owner?.profileImage || 'https://via.placeholder.com/32'} alt={review.owner?.fullName} className="h-8 w-8 rounded-full" />
                                <p className="font-semibold text-[var(--color-text-strong)]">- {review.owner?.fullName || 'Anonymous'}</p>
                             </div>
                             <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" />)}</div>
                          </div>
                          <blockquote className="mt-2 text-[var(--color-text)] italic border-l-4 border-[var(--color-primary)] pl-4">"{review.content}"</blockquote>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-[var(--color-text-muted)]">No reviews yet. Be the first to leave one after a completed booking!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HelperProfilePage;