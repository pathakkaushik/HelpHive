import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const HelperCard = ({ helper }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-slate-800/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={helper.imageUrl} alt={helper.name} />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary">{helper.role}</p>
          <Link to={`/helper/${helper.id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-white">{helper.name}</p>
            <p className="mt-3 text-base text-slate-400">{helper.location}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
            <span className="ml-1 text-slate-300">{helper.rating} ({helper.reviews} reviews)</span>
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