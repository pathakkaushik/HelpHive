import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare } from 'lucide-react';
import api from '../api/axios';

const BookingModal = ({ helper, show, onClose, onBookingSuccess }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/bookings', {
        helperId: helper._id,
        bookingDate,
        message,
      });
      if (response.data.success) {
        onBookingSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send booking request.');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-xl bg-[var(--color-bg-component)] p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-[var(--color-text-strong)]">Book Interview with {helper.fullName}</h2>
          <p className="mt-2 text-[var(--color-text-muted)]">Select a date and send a message for your interview request.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-md">{error}</p>}
            
            <div>
              <label htmlFor="bookingDate" className="block text-sm font-medium text-[var(--color-text)]">Interview Date</label>
              <div className="relative mt-2">
                 <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
                 <input
                    type="date"
                    id="bookingDate"
                    name="bookingDate"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="pl-10"
                    min={new Date().toISOString().split("T")[0]} // Prevent picking past dates
                 />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)]">Message (Optional)</label>
               <div className="relative mt-2">
                 <MessageSquare className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[var(--color-text-muted)]" />
                 <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`e.g., "Hi ${helper.fullName.split(' ')[0]}, we are looking for a full-time cook. Are you available for a quick chat?"`}
                    className="pl-10 !py-2.5"
                 ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;