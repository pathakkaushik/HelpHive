import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Services</h3>
            <Link to="/find" className="text-base text-slate-300 hover:text-primary">Maid Service</Link>
            <Link to="/find" className="text-base text-slate-300 hover:text-primary">Cooking Service</Link>
            <Link to="/find" className="text-base text-slate-300 hover:text-primary">Babysitting</Link>
            <Link to="/find" className="text-base text-slate-300 hover:text-primary">Elderly Care</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Company</h3>
            <Link to="/about" className="text-base text-slate-300 hover:text-primary">About Us</Link>
            <a href="#" className="text-base text-slate-300 hover:text-primary">Blog</a>
            <a href="#" className="text-base text-slate-300 hover:text-primary">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">For Professionals</h3>
            <Link to="/worker-signup" className="text-base text-slate-300 hover:text-primary">Join as a Professional</Link>
            <Link to="/worker-login" className="text-base text-slate-300 hover:text-primary">Worker Login</Link>
            <a href="#" className="text-base text-slate-300 hover:text-primary">Partner Benefits</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</h3>
            <a href="#" className="text-base text-slate-300 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-base text-slate-300 hover:text-primary">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="h-6 w-6 text-primary" />
            <p className="text-base text-slate-400">© 2025 HelpHive. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;