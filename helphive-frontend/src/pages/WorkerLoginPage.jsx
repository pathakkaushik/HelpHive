import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';

const WorkerLoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-[var(--color-primary)]" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-text-strong)]">
              Worker Portal Login
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Access your profile, job requests, and schedule.
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="flex flex-col gap-4 rounded-md">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address or Phone</label>
                <input id="email-address" name="email" type="text" autoComplete="email" required placeholder="Email address or Phone Number" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
              </div>
            </div>
            <div className="text-sm text-center">
                <a href="#" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">Forgot your password?</a>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center btn btn-primary">
                Sign in to Worker Portal
              </button>
            </div>
             <p className="text-center text-sm text-[var(--color-text-muted)]">
                Don't have a worker profile?{' '}
                <Link to="/worker-signup" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                    Register here
                </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkerLoginPage;