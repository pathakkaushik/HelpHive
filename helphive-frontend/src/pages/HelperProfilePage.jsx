import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerificationBadge from '../components/VerificationBadge';
import { helpers, reviewsData } from '../data/dummyData';
import { Star, MapPin, Briefcase } from 'lucide-react';

const HelperProfilePage = () => {
  const { id } = useParams();
  const helper = helpers.find(h => h.id === parseInt(id));

  if (!helper) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow text-center py-20">
          <h1 className="text-2xl font-bold">Helper not found.</h1>
          <Link to="/find" className="mt-4 inline-block text-primary hover:underline">Back to search</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Profile Header */}
          <div className="p-6 md:flex md:items-center md:gap-6">
            <img className="h-32 w-32 flex-shrink-0 rounded-full object-cover md:h-48 md:w-48" src={helper.imageUrl} alt={helper.name} />
            <div className="mt-4 md:mt-0">
              <h1 className="text-3xl font-bold text-gray-900">{helper.name}</h1>
              <p className="text-xl text-primary">{helper.role}</p>
              <div className="mt-2 flex items-center gap-4 text-gray-600">
                <span className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> {helper.location}</span>
                <span className="flex items-center"><Briefcase className="mr-1 h-4 w-4" /> {helper.experience} years experience</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <VerificationBadge type="police" isVerified={helper.verified.police} />
                <VerificationBadge type="id" isVerified={helper.verified.id} />
              </div>
            </div>
            <div className="mt-6 md:ml-auto md:mt-0">
              <Link to="#" className="w-full rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-hover">
                Book an Interview
              </Link>
            </div>
          </div>

          {/* Profile Body */}
          <div className="border-t px-6 py-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{helper.description}</p>
                
                <h3 className="mt-8 text-xl font-semibold text-gray-800">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {helper.skills.map(skill => (
                    <span key={skill} className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1">
                <h2 className="text-2xl font-semibold text-gray-800">Reviews & Ratings</h2>
                <div className="mt-4 flex items-center">
                  <span className="text-5xl font-bold text-gray-900">{helper.rating}</span>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(helper.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-gray-500">Based on {helper.reviews} reviews</p>
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  {reviewsData.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-center">
                         {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />)}
                      </div>
                      <blockquote className="mt-2 text-gray-600 italic">"{review.quote}"</blockquote>
                      <p className="mt-2 text-right font-semibold text-gray-800">- {review.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelperProfilePage;