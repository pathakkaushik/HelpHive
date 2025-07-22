import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon, Upload } from 'lucide-react';
import { services } from '../data/dummyData';
import { Link } from 'react-router-dom';

const WorkerSignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-[var(--color-primary)]" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-text-strong)]">
              Join HelpHive as a Professional
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Start getting job requests from your area. Already registered?{' '}
              <Link to="/worker-login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                Login here
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6 rounded-lg border bg-[var(--color-bg-component)] p-8 shadow-lg" action="#" method="POST">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Full Name</label>
                    <div className="mt-2"><input type="text" name="full-name" id="full-name" required /></div>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Phone Number</label>
                    <div className="mt-2"><input type="tel" name="phone" id="phone" required /></div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="service" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Primary Service</label>
                    <div className="mt-2">
                      <select id="service" name="service">
                          {services.map(s => <option key={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="experience" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Years of Experience</label>
                     <div className="mt-2"><input type="number" name="experience" id="experience" required /></div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="id-upload" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Upload ID Proof (Aadhaar, Voter ID)</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-[var(--color-border)] px-6 py-10">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-[var(--color-text-muted)]" />
                            <div className="mt-4 flex text-sm leading-6 text-[var(--color-text-muted)]">
                                <label htmlFor="id-upload" className="relative cursor-pointer rounded-md bg-[var(--color-bg-component)] font-semibold text-[var(--color-primary)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-bg-component)] hover:text-[var(--color-primary-hover)]">
                                    <span>Upload a file</span>
                                    <input id="id-upload" name="id-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                             <p className="text-xs leading-5 text-[var(--color-text-muted)]/80">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="flex w-full justify-center btn btn-primary">
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