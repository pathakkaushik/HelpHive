import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HelperCard from '../components/HelperCard';
import { helpers, services } from '../data/dummyData';
import { Search } from 'lucide-react';

const FindHelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    service: 'All',
    verified: false,
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const filteredHelpers = helpers.filter(helper => {
    const matchesSearch = helper.name.toLowerCase().includes(searchTerm.toLowerCase()) || helper.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filters.service === 'All' || helper.role === filters.service;
    const matchesVerification = !filters.verified || (helper.verified.police && helper.verified.id);
    return matchesSearch && matchesService && matchesVerification;
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Find Your Perfect Help</h1>
          <p className="mt-2 text-lg text-gray-600">Search and filter from our list of trusted professionals.</p>
        </header>

        {/* Filters Section */}
        <div className="rounded-lg border bg-white p-4 shadow-sm md:flex md:items-center md:justify-between md:gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location (e.g., 'Sita' or 'Mumbai')"
              className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row md:mt-0">
            <select
              name="service"
              className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:w-48"
              value={filters.service}
              onChange={handleFilterChange}
            >
              <option value="All">All Services</option>
              {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                name="verified"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={filters.verified}
                onChange={handleFilterChange}
              />
              <label htmlFor="verified" className="ml-2 block text-sm text-gray-900">
                Fully Verified Only
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {filteredHelpers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredHelpers.map(helper => (
                <HelperCard key={helper.id} helper={helper} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-800">No Helpers Found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindHelpPage;