import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const HelperCard = ({ helper }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-[var(--color-bg-component-subtle)] transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/10">
      <div className="relative flex-shrink-0">
        <img className="h-56 w-full object-cover" src={helper.imageUrl} alt={helper.name} />
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40"></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <PlayCircle className="h-4 w-4" />
          <span>Intro Video</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--color-primary)]">{helper.role}</p>
          <Link to={`/helper/${helper.id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-[var(--color-text-strong)]">{helper.name}</p>
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
            <VerificationBadge type="police" isVerified={helper.verified.police} />
            <VerificationBadge type="id" isVerified={helper.verified.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperCard;