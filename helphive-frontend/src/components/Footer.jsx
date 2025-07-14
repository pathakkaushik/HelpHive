import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Services</h3>
            <Link to="/find" className="text-base text-gray-300 hover:text-white">Maid Service</Link>
            <Link to="/find" className="text-base text-gray-300 hover:text-white">Cooking Service</Link>
            <Link to="/find" className="text-base text-gray-300 hover:text-white">Babysitting</Link>
            <Link to="/find" className="text-base text-gray-300 hover:text-white">Elderly Care</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <a href="#" className="text-base text-gray-300 hover:text-white">About Us</a>
            <a href="#" className="text-base text-gray-300 hover:text-white">Blog</a>
            <a href="#" className="text-base text-gray-300 hover:text-white">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">For Professionals</h3>
            <Link to="/worker-signup" className="text-base text-gray-300 hover:text-white">Join as a Professional</Link>
            <Link to="/worker-login" className="text-base text-gray-300 hover:text-white">Worker Login</Link>
            <a href="#" className="text-base text-gray-300 hover:text-white">Partner Benefits</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="h-6 w-6" />
            <p className="text-base text-gray-400">© 2025 HelpHive. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;