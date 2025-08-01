import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, X, Clock, Star } from 'lucide-react';

// A map to style statuses
const statusStyles = {
    PENDING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    CONFIRMED: 'bg-green-500/20 text-green-300 border-green-500/30',
    REJECTED: 'bg-red-500/20 text-red-300 border-red-500/30',
    COMPLETED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    CANCELLED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const BookingList = ({ bookings, isWorker, onUpdateStatus, onLeaveReview }) => {
    
    if (!bookings || bookings.length === 0) {
        return <p className="text-center text-[var(--color-text-muted)] py-8">No bookings found.</p>;
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking, index) => (
                <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-lg border bg-[var(--color-bg-component)] p-4 shadow-md transition-all hover:shadow-lg"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={isWorker ? booking.client.profileImage || 'https://via.placeholder.com/48' : booking.helper.profileImage || 'https://via.placeholder.com/48'}
                                alt="profile"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-bold text-[var(--color-text-strong)]">{isWorker ? booking.client.fullName : booking.helper.fullName}</p>
                                <p className="text-sm text-[var(--color-text-muted)]">{isWorker ? booking.client.email : booking.helper.primaryService}</p>
                            </div>
                        </div>
                        <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[booking.status]}`}>
                            {booking.status}
                        </div>
                    </div>

                    <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-4 space-y-2 text-sm text-[var(--color-text)]">
                       <p className="flex items-center gap-2">
                           <Clock size={16} className="text-[var(--color-text-muted)]" />
                           Requested Date: <strong>{format(new Date(booking.bookingDate), 'PPP')}</strong>
                        </p>
                       {booking.message && <blockquote className="italic text-[var(--color-text-muted)] border-l-2 border-[var(--color-border)] pl-3">"{booking.message}"</blockquote>}
                    </div>
                    
                    {/* Action buttons section */}
                    <div className="mt-4 flex justify-end gap-3">
                        {isWorker && booking.status === 'PENDING' && (
                            <>
                                <button onClick={() => onUpdateStatus(booking._id, 'REJECTED')} className="btn btn-secondary !px-3 !py-1.5 flex items-center gap-1"><X size={16} /> Reject</button>
                                <button onClick={() => onUpdateStatus(booking._id, 'CONFIRMED')} className="btn btn-primary !px-3 !py-1.5 flex items-center gap-1"><Check size={16} /> Accept</button>
                            </>
                        )}
                        {!isWorker && booking.status === 'COMPLETED' && !booking.review && (
                            <button onClick={() => onLeaveReview(booking)} className="btn btn-primary !px-3 !py-1.5 flex items-center gap-1"><Star size={16} /> Leave Review</button>
                        )}
                        {!isWorker && booking.status === 'COMPLETED' && booking.review && (
                            <p className="text-sm text-green-400 flex items-center gap-1"><Check size={16}/> Review Submitted</p>
                        )}
                        {/* A worker could also mark a job as complete */}
                        {isWorker && booking.status === 'CONFIRMED' && (
                             <button onClick={() => onUpdateStatus(booking._id, 'COMPLETED')} className="btn btn-primary !px-3 !py-1.5 flex items-center gap-1"><Check size={16} /> Mark as Complete</button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default BookingList;