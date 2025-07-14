import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { services, helpers } from '../data/dummyData';
import HelperCard from '../components/HelperCard';

const HomePage = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Find Trusted Househelp <span className="text-primary">Near You</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        Connect with verified, reliable, and skilled maids, cooks, babysitters, and more. Your home is in safe hands.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/find" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            Find Help Now
                        </Link>
                        <Link to="/worker-signup" className="text-sm font-semibold leading-6 text-slate-200 hover:text-white">
                            Join as a Professional <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Services Section */}
        <div className="bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Our Services</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need for a happier home
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div key={service.name} className="flex flex-col items-center rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center transition-transform hover:scale-105">
                    <div className="text-5xl">{service.icon}</div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{service.name}</h3>
                    <p className="mt-2 text-slate-400">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Helpers Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Top Professionals</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Meet our highly-rated and verified helpers
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {helpers.slice(0, 3).map((helper) => (
                <HelperCard key={helper.id} helper={helper} />
              ))}
            </div>
          </div>
        </div>

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
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Create a Worker Profile
                        </Link>
                        <Link to="/worker-login" className="text-sm font-semibold leading-6 text-white">
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