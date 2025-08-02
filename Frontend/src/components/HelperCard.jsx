import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle } from 'lucide-react';
import VerificationBadge from './VerificationBadge';
import { motion } from 'framer-motion'; // NEW: Import motion

const HelperCard = ({ helper }) => {
  return (
    // UPDATED: Converted to motion.div and added whileHover animation
    <motion.div 
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-[var(--color-bg-component-subtle)] transition-shadow duration-300"
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 25px -5px rgba(var(--color-radial-gradient), 0.2), 0 8px 10px -6px rgba(var(--color-radial-gradient), 0.2)"
      }}
    >
      {/* NEW: Added a container for the image to clip the zoom effect */}
      <div className="relative flex-shrink-0 overflow-hidden">
        {/* UPDATED: Converted image to motion.img with a zoom on hover */}
        <motion.img 
          className="h-56 w-full object-cover" 
          src={helper.imageUrl || 'https://via.placeholder.com/400x300'} 
          alt={helper.name}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-colors"></div>
        {helper.hasVideo && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <PlayCircle className="h-4 w-4" />
                <span>Intro Video</span>
            </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--color-primary)]">{helper.role}</p>
          <Link to={`/helper/${helper.id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-[var(--color-text-strong)] group-hover:text-[var(--color-primary)] transition-colors">{helper.name}</p>
            <p className="mt-1 text-base text-[var(--color-text-muted)]">{helper.location}</p>
            <p className="mt-3 text-sm italic text-[var(--color-text-muted)]">"{helper.tagline}"</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
            <span className="ml-1.5 text-[var(--color-text)]">{helper.rating} ({helper.reviews} reviews)</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <VerificationBadge type="police" isVerified={helper.verified?.police} />
            <VerificationBadge type="id" isVerified={helper.verified?.id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelperCard;