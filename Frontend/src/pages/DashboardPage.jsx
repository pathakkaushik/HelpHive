import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingList from '../components/BookingList';
import ReviewModal from '../components/ReviewModal';
import api from '../api/axios';
import { Send, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [sentBookings, setSentBookings] = useState([]);
  const [receivedBookings, setReceivedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('received');
  const [reviewingBooking, setReviewingBooking] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const promises = [api.get('/bookings/sent')];
      if (user.role === 'WORKER') {
        promises.push(api.get('/bookings/received'));
      }
      
      const [sentRes, receivedRes] = await Promise.all(promises);
      
      setSentBookings(sentRes.data.data);
      if (receivedRes) {
        setReceivedBookings(receivedRes.data.data);
      }

    } catch (err) {
      setError('Failed to load bookings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
        navigate('/login');
        return;
    }
    fetchBookings();
  }, [user, authLoading, navigate, fetchBookings]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
        await api.patch(`/bookings/${bookingId}/status`, { status });
        // Refetch all bookings to ensure data consistency
        fetchBookings();
    } catch (err) {
        console.error("Failed to update status:", err);
        alert('Failed to update booking status.');
    }
  };

  const handleReviewSuccess = () => {
      // Refetch to show the "Review Submitted" status
      fetchBookings();
  };

  if (authLoading || loading) {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
            <Navbar />
            <main className="flex-grow py-20 text-center text-lg text-[var(--color-text-muted)]">
                Loading Dashboard...
            </main>
            <Footer />
        </div>
    );
  }

  const isWorker = user?.role === 'WORKER';

  return (
    <>
      <ReviewModal
          booking={reviewingBooking}
          show={!!reviewingBooking}
          onClose={() => setReviewingBooking(null)}
          onReviewSuccess={handleReviewSuccess}
      />
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-strong)]">
                {isWorker ? 'Worker Dashboard' : 'My Bookings'}
              </h1>
              <p className="mt-2 text-lg text-[var(--color-text)]">
                View and manage your interview requests and jobs.
              </p>
            </header>
            
            {error && <p className="text-red-500 text-center bg-red-500/10 p-4 rounded-md">{error}</p>}
            
            {isWorker && (
              <div className="mb-6 border-b border-[var(--color-border)]">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <button onClick={() => setActiveTab('received')} className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'received' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-muted)] hover:border-gray-300 hover:text-[var(--color-text)]'}`}>
                         <Inbox className="inline-block mr-2 h-5 w-5"/> Received Requests
                      </button>
                      <button onClick={() => setActiveTab('sent')} className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'sent' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-muted)] hover:border-gray-300 hover:text-[var(--color-text)]'}`}>
                         <Send className="inline-block mr-2 h-5 w-5"/> My Sent Requests
                      </button>
                  </nav>
              </div>
            )}

            <div className="mt-8">
                {isWorker ? (
                  <>
                      {activeTab === 'received' && (
                          <BookingList bookings={receivedBookings} isWorker={true} onUpdateStatus={handleUpdateStatus} />
                      )}
                      {activeTab === 'sent' && (
                          <BookingList bookings={sentBookings} isWorker={false} onLeaveReview={setReviewingBooking}/>
                      )}
                  </>
                ) : (
                   <div>
                      <h2 className="text-2xl font-semibold text-[var(--color-text-strong)] mb-4 flex items-center gap-2">
                         <Send size={24}/> My Sent Requests
                      </h2>
                      <BookingList bookings={sentBookings} isWorker={false} onLeaveReview={setReviewingBooking}/>
                   </div>
                )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;