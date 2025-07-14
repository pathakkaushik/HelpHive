import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center gap-2">
            <Hexagon className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold text-gray-800">HelpHive</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-4">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">Home</Link>
              <Link to="/find" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">Find Help</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">Login</Link>
            <Link to="/signup" className="ml-4 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">Sign Up</Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="border-t md:hidden">
          <div className="flex flex-col gap-1 px-2 pb-3 pt-2">
            <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Home</Link>
            <Link to="/find" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Find Help</Link>
            <Link to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Login</Link>
            <Link to="/signup" className="block rounded-md bg-primary px-3 py-2 text-base font-medium text-white hover:bg-primary-hover">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
