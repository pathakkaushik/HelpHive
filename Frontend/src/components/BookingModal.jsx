import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare, Clock, DollarSign } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const BookingModal = ({ helper, show, onClose, onBookingSuccess }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sending request...");
    try {
      const response = await api.post('/bookings', {
        helperId: helper._id,
        bookingDate,
        bookingTime,
        message,
      });
      if (response.data.success) {
        toast.success("Booking request sent!", { id: toastId });
        onBookingSuccess();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send request.', { id: toastId });
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
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-[var(--color-text-strong)]">Book Interview with {helper.fullName}</h2>

          <div className="mt-4 rounded-lg bg-[var(--color-bg-component-subtle)] p-4 border border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-text-strong)] flex items-center gap-2">
                  <DollarSign size={20} className="text-[var(--color-primary)]" />
                  Quoted Price
              </h3>
              {helper.pricing?.rate > 0 ? (
                <p className="text-[var(--color-text)] mt-1">
                    This helper's rate is <strong>{helper.pricing.rate} / {helper.pricing.per}</strong>.
                </p>
              ) : (
                <p className="text-[var(--color-text-muted)] mt-1">
                    To be discussed during the interview.
                </p>
              )}
          </div>

          <p className="mt-4 text-[var(--color-text-muted)]">Select a date and time for your interview request.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Interview Date</label>
                <div className="relative mt-2">
                   <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
                   <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="pl-10"
                      min={new Date().toISOString().split("T")[0]}
                   />
                </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Interview Time</label>
                <div className="relative mt-2">
                   <Clock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
                   <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="pl-10"
                   />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)]">Message (Optional)</label>
               <div className="relative mt-2">
                 <MessageSquare className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[var(--color-text-muted)]" />
                 <textarea
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