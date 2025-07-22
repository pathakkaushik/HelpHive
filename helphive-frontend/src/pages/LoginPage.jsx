import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-[var(--color-primary)]" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-text-strong)]">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Or{' '}
              <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                create an account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="flex flex-col gap-4 rounded-md">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg-component-subtle)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-text)]">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">Forgot your password?</a>
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;