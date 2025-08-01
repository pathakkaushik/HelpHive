import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth(); // Get user state and logout function

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[--color-bg]/80 backdrop-blur-lg shadow-lg dark:shadow-black/20 border-b border-[var(--color-border)]' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center gap-2" onClick={closeMenu}>
            <Hexagon className="h-8 w-8 text-[var(--color-primary)]" fill="currentColor" />
            <span className="text-2xl font-bold text-[var(--color-text-strong)]">HelpHive</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-4">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]">Home</Link>
              <Link to="/find" className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]">Find Help</Link>
            </div>
          </div>
          <div className="hidden items-center md:flex">
            <ThemeToggle />
            {user ? (
              <>
                <span className="ml-4 text-sm font-medium text-[var(--color-text)]">Hi, {user.fullName.split(' ')[0]}</span>
                <button onClick={logout} className="ml-4 btn btn-secondary !py-1.5 !px-3">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]">Login</Link>
                <Link to="/signup" className="ml-2 btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden">
          <div className="flex flex-col gap-1 px-2 pb-3 pt-2">
            <Link to="/" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-component-subtle)] hover:text-[var(--color-primary)]">Home</Link>
            <Link to="/find" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-component-subtle)] hover:text-[var(--color-primary)]">Find Help</Link>
            <div className="my-2 border-t border-[var(--color-border-subtle)]"></div>
            {user ? (
              <button onClick={() => { logout(); closeMenu(); }} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-500 hover:bg-[var(--color-bg-component-subtle)]">Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-component-subtle)] hover:text-[var(--color-primary)]">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="mt-1 block rounded-md bg-[var(--color-primary)] px-3 py-2 text-center text-base font-medium text-white hover:bg-[var(--color-primary-hover)]">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;