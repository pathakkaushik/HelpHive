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
      <div className="flex min-h-screen flex-col bg-slate-900">
        <Navbar />
        <main className="flex-grow py-20 text-center">
          <h1 className="text-2xl font-bold text-white">Helper not found.</h1>
          <Link to="/find" className="mt-4 inline-block text-primary hover:underline">Back to search</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left Column (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 self-start">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <div className="flex flex-col items-center text-center">
                <img className="h-40 w-40 rounded-full object-cover shadow-lg" src={helper.imageUrl} alt={helper.name} />
                <h1 className="mt-4 text-3xl font-bold text-gray-900">{helper.name}</h1>
                <p className="mt-1 text-xl font-medium text-primary">{helper.role}</p>
                 <div className="mt-4 flex items-center justify-center gap-2">
                  <VerificationBadge type="police" isVerified={helper.verified.police} />
                  <VerificationBadge type="id" isVerified={helper.verified.id} />
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span>{helper.location}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span>{helper.experience} years experience</span>
                </div>
              </div>
              <div className="mt-6">
                 <Link to="#" className="flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-primary-hover">
                  Book Interview
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (Scrollable) */}
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <div className="space-y-10">
              {/* About Section */}
              <div className="rounded-lg bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{helper.description}</p>
              </div>

              {/* Skills Section */}
              <div className="rounded-lg bg-white p-8 shadow-xl">
                 <h3 className="text-2xl font-semibold text-gray-800">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {helper.skills.map(skill => (
                    <span key={skill} className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="rounded-lg bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800">Reviews & Ratings</h2>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">{helper.rating}</span>
                    <span className="text-xl text-gray-500">/ 5</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(helper.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-gray-500">Based on {helper.reviews} reviews</p>
                  </div>
                </div>
                <div className="mt-8 space-y-8 border-t border-gray-200 pt-8">
                  {reviewsData.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                         <p className="font-semibold text-gray-800">- {review.name}</p>
                         <div className="flex items-center">
                           {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />)}
                         </div>
                      </div>
                      <blockquote className="mt-2 text-gray-600 italic border-l-4 border-primary pl-4">"{review.quote}"</blockquote>
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