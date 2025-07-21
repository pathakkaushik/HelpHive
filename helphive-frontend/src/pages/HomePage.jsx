import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HelperCard from '../components/HelperCard';
import { services, helpers, reviewsData } from '../data/dummyData';
import { Search, UserCheck, Shield, Award, Star } from 'lucide-react';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const HomePage = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-40 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                    Find Trusted Househelp <span className="text-primary">Near You</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-6 text-lg leading-8 text-slate-300"
                >
                    Connect with verified, reliable, and skilled maids, cooks, babysitters, and more. Your home is in safe hands.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-10 flex items-center justify-center gap-x-6"
                >
                    <Link to="/find" className="rounded-md bg-primary px-4 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Find Help Now
                    </Link>
                    <Link to="/worker-signup" className="text-sm font-semibold leading-6 text-slate-200 transition-colors hover:text-white">
                        Join as a Professional <span aria-hidden="true">→</span>
                    </Link>
                </motion.div>
            </div>
        </div>
        
        {/* How It Works Section */}
        <motion.div
          className="py-24 sm:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Simple & Transparent</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Search className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">1. Search & Filter</h3>
                  <p className="mt-2 text-slate-400">Tell us what you need. Browse profiles and filter by service, location, and verifications.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <UserCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">2. Shortlist & Interview</h3>
                  <p className="mt-2 text-slate-400">Review detailed profiles, watch intro videos, and schedule interviews with your chosen candidates.</p>
              </div>
               <div className="flex flex-col items-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">3. Hire with Confidence</h3>
                  <p className="mt-2 text-slate-400">Finalize your choice and hire directly. We provide support and a replacement guarantee.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Helpers Section */}
        <motion.div 
          className="py-24 sm:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Top Professionals</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Meet our highly-rated and verified helpers
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {helpers.slice(0, 3).map((helper, index) => (
                <motion.div
                  key={helper.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <HelperCard helper={helper} />
                </motion.div>
              ))}
            </div>
             <div className="mt-16 text-center">
              <Link to="/find" className="text-sm font-semibold text-primary hover:text-primary-hover">
                View all professionals <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.section 
          className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 sm:py-32 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Peace of Mind</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">What Our Customers Say</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {reviewsData.map((review, index) => (
                <figure key={index} className="rounded-2xl bg-slate-800/50 p-8 text-sm leading-6">
                  <blockquote className="text-slate-300">
                    <p>“{review.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" />)}
                    </div>
                    <div className="font-semibold text-white">{review.name}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </motion.section>

        {/* For Professionals CTA Section */}
        <div className="bg-slate-900">
            <div className="mx-auto max-w-4xl px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Are you a domestic help professional?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-teal-100">
                        Join HelpHive to connect with families in your area, manage your own schedule, and increase your earnings.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/worker-signup"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-transform hover:scale-105 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Create a Worker Profile
                        </Link>
                        <Link to="/worker-login" className="text-sm font-semibold leading-6 text-white transition-opacity hover:opacity-80">
                            Worker Login <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                                <stop stopColor="#14B8A6" />
                                <stop offset={1} stopColor="#0F766E" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;