import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon, Upload } from 'lucide-react';
import { services } from '../data/dummyData';
import { Link } from 'react-router-dom';

const WorkerSignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-primary" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Join HelpHive as a Professional
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Start getting job requests from your area. Already registered?{' '}
              <Link to="/worker-login" className="font-medium text-primary hover:text-primary-hover">
                Login here
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6 rounded-lg border bg-white p-8 shadow-sm" action="#" method="POST">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                    <input type="text" name="full-name" id="full-name" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                    <input type="tel" name="phone" id="phone" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="service" className="block text-sm font-medium leading-6 text-gray-900">Primary Service</label>
                    <select id="service" name="service" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm">
                        {services.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">Years of Experience</label>
                    <input type="number" name="experience" id="experience" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" />
                </div>
                <div className="col-span-full">
                    <label htmlFor="id-upload" className="block text-sm font-medium leading-6 text-gray-900">Upload ID Proof (Aadhaar, Voter ID)</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="id-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-hover">
                                    <span>Upload a file</span>
                                    <input id="id-upload" name="id-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="flex w-full justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkerSignUpPage;