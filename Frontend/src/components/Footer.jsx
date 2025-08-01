import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-component)] border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Services</h3>
            <Link to="/find" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Maid Service</Link>
            <Link to="/find" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Cooking Service</Link>
            <Link to="/find" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Babysitting</Link>
            <Link to="/find" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Elderly Care</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Company</h3>
            <Link to="/about" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">About Us</Link>
            <a href="#" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Blog</a>
            <a href="#" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">For Professionals</h3>
            <Link to="/worker-signup" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Join as a Professional</Link>
            <Link to="/worker-login" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Worker Login</Link>
            <a href="#" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Partner Benefits</a>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Legal</h3>
            <a href="#" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Privacy Policy</a>
            <a href="#" className="text-base text-[var(--color-text)] hover:text-[var(--color-primary)]">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--color-border-subtle)] pt-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="h-6 w-6 text-[var(--color-primary)]" />
            <p className="text-base text-[var(--color-text-muted)]">© 2025 HelpHive. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;