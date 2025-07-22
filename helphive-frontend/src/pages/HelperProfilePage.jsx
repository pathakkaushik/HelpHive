import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerificationBadge from '../components/VerificationBadge';
import { helpers, reviewsData } from '../data/dummyData';
import { Star, MapPin, Briefcase, PlayCircle } from 'lucide-react';

const HelperProfilePage = () => {
  const { id } = useParams();
  const helper = helpers.find(h => h.id === parseInt(id));
  const [showVideo, setShowVideo] = useState(false);

  if (!helper) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Navbar />
        <main className="flex-grow py-20 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-strong)]">Helper not found.</h1>
          <Link to="/find" className="mt-4 inline-block text-[var(--color-primary)] hover:underline">Back to search</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)]">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left Column (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 self-start">
            <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl">
              <div className="flex flex-col items-center text-center">
                <img className="h-40 w-40 rounded-full object-cover shadow-lg" src={helper.imageUrl} alt={helper.name} />
                <h1 className="mt-4 text-3xl font-bold text-[var(--color-text-strong)]">{helper.name}</h1>
                <p className="mt-1 text-xl font-medium text-[var(--color-primary)]">{helper.role}</p>
                 <div className="mt-4 flex items-center justify-center gap-2">
                  <VerificationBadge type="police" isVerified={helper.verified.police} />
                  <VerificationBadge type="id" isVerified={helper.verified.id} />
                </div>
              </div>
              <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6 text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <span>{helper.location}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 flex-shrink-0" />
                  <span>{helper.experience} years experience</span>
                </div>
              </div>
              <div className="mt-6">
                 <Link to="#" className="w-full btn btn-primary">
                  Book Interview
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (Scrollable) */}
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <div className="space-y-10">
              {/* Video Player Section */}
              <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">Video Introduction</h2>
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg">
                  {!showVideo ? (
                    <>
                      <img src={helper.profileVideoThumbnail} alt="Video thumbnail" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <button 
                        onClick={() => setShowVideo(true)} 
                        className="absolute inset-0 flex items-center justify-center text-white transition-transform hover:scale-110"
                      >
                        <PlayCircle size={80} className="drop-shadow-lg" />
                      </button>
                    </>
                  ) : (
                    <iframe
                      src={helper.videoUrl + '?autoplay=1'}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    ></iframe>
                  )}
                </div>
              </div>
              
              {/* About Section */}
              <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">About Me</h2>
                <p className="mt-4 text-[var(--color-text)] leading-relaxed">{helper.description}</p>
              </div>

              {/* Skills Section */}
              <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                 <h3 className="text-2xl font-semibold text-[var(--color-text-strong)]">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {helper.skills.map(skill => (
                    <span key={skill} className="rounded-full bg-teal-100/70 dark:bg-teal-500/20 px-4 py-1.5 text-sm font-medium text-teal-800 dark:text-teal-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-xl sm:p-8">
                <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">Reviews & Ratings</h2>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-[var(--color-text-strong)]">{helper.rating}</span>
                    <span className="text-xl text-[var(--color-text-muted)]">/ 5</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(parseFloat(helper.rating)) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">Based on {helper.reviews} reviews</p>
                  </div>
                </div>
                <div className="mt-8 space-y-8 border-t border-[var(--color-border-subtle)] pt-8">
                  {reviewsData.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                         <p className="font-semibold text-[var(--color-text-strong)]">- {review.name}</p>
                         <div className="flex items-center">
                           {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" />)}
                         </div>
                      </div>
                      <blockquote className="mt-2 text-[var(--color-text)] italic border-l-4 border-[var(--color-primary)] pl-4">"{review.quote}"</blockquote>
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