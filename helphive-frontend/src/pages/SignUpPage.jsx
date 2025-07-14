import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-primary" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                Sign in
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="flex flex-col gap-4 rounded-md shadow-sm">
               <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input id="full-name" name="name" type="text" required className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Full Name" />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" required className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Password" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Create Account
              </button>
            </div>
             <p className="text-center text-xs text-gray-500">
              By creating an account, you agree to our <a href="#" className="font-medium text-gray-900 hover:underline">Terms of Service</a>.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;