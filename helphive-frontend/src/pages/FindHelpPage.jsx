import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HelperCard from '../components/HelperCard';
import { helpers, services } from '../data/dummyData';
import { Search, MapPin, X } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const initialFilters = {
  searchTerm: '',
  locationTerm: '',
  service: 'All',
  verified: false,
};

const FindHelpPage = () => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filteredHelpers = helpers.filter(helper => {
    const matchesSearch = helper.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || helper.role.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesLocation = helper.city.toLowerCase().includes(filters.locationTerm.toLowerCase());
    const matchesService = filters.service === 'All' || helper.role === filters.service;
    const matchesVerification = !filters.verified || (helper.verified.police && helper.verified.id);
    return matchesSearch && matchesLocation && matchesService && matchesVerification;
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <Navbar />
      <div className="container mx-auto max-w-7xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Find Your Perfect Help</h1>
          <p className="mt-4 text-lg text-slate-300">Search by name, location, and service to find trusted professionals.</p>
        </header>

        {/* Filters Section */}
        <div className="mb-10 rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
                {/* Search by Name/Role */}
                <div className="relative lg:col-span-3">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="searchTerm"
                      placeholder="Search by name or role"
                      className="pl-12"
                      value={filters.searchTerm}
                      onChange={handleFilterChange}
                    />
                </div>
                {/* Search by Location */}
                <div className="relative lg:col-span-3">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="locationTerm"
                      placeholder="e.g., Mumbai, Bengaluru"
                      className="pl-12"
                      value={filters.locationTerm}
                      onChange={handleFilterChange}
                    />
                </div>
                {/* Service Dropdown */}
                <div className="lg:col-span-2">
                    <select name="service" className="w-full" value={filters.service} onChange={handleFilterChange}>
                        <option value="All">All Services</option>
                        {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                </div>
                {/* Verified Checkbox */}
                <div className="flex items-center justify-center rounded-md bg-slate-800 ring-1 ring-slate-700 lg:col-span-1">
                    <label htmlFor="verified" className="flex h-full w-full cursor-pointer items-center justify-center gap-2 p-2.5 text-sm text-slate-200">
                        <input
                            type="checkbox" id="verified" name="verified"
                            className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800"
                            checked={filters.verified} onChange={handleFilterChange}
                        />
                        Verified
                    </label>
                </div>
                {/* Clear Button */}
                <div className="lg:col-span-1">
                   <button onClick={clearFilters} className="h-full w-full btn btn-subtle">
                        <X className="h-4 w-4 mr-2" />
                        Clear
                    </button>
                </div>
            </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {filteredHelpers.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredHelpers.map(helper => (
                <motion.div key={helper.id} variants={itemVariants}>
                  <HelperCard helper={helper} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-semibold text-white">No Helpers Found</h3>
              <p className="mt-2 text-slate-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindHelpPage;