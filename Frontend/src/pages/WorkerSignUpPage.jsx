import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Hardcoded for the dropdown, can be fetched from an API in the future
const services = [
    { name: 'Maid Service' },
    { name: 'Cooking Service' },
    { name: 'Babysitting' },
    { name: 'Elderly Care' }
];

const WorkerSignUpPage = () => {
    const navigate = useNavigate();
    const { registerWorker } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        primaryService: services[0].name,
        experience: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('phone', formData.phone);
        data.append('primaryService', formData.primaryService);
        data.append('experience', formData.experience);
        data.append('role', 'WORKER');
        if (profileImage) {
            data.append('profileImage', profileImage);
        }
        
        try {
            await registerWorker(data);
            navigate('/worker-login', { state: { message: "Application submitted! Please log in to manage your profile." } });
        } catch (err) {
            setError(err.response?.data?.message || 'Application submission failed.');
        } finally {
            setLoading(false);
        }
    };


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
          <form className="mt-8 space-y-6 rounded-lg border bg-[var(--color-bg-component)] p-8 shadow-lg" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-md mb-6">{error}</p>}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Full Name</label>
                    <div className="mt-2"><input type="text" name="fullName" id="fullName" required value={formData.fullName} onChange={handleChange} /></div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Phone Number</label>
                    <div className="mt-2"><input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} /></div>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Email</label>
                    <div className="mt-2"><input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} /></div>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Password</label>
                    <div className="mt-2"><input type="password" name="password" id="password" required value={formData.password} onChange={handleChange} /></div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="primaryService" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Primary Service</label>
                    <div className="mt-2">
                      <select id="primaryService" name="primaryService" value={formData.primaryService} onChange={handleChange}>
                          {services.map(s => <option key={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="experience" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Years of Experience</label>
                     <div className="mt-2"><input type="number" name="experience" id="experience" required value={formData.experience} onChange={handleChange} /></div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="profileImage" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Upload Profile Photo</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-[var(--color-border)] px-6 py-10">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-[var(--color-text-muted)]" />
                            <div className="mt-4 flex text-sm leading-6 text-[var(--color-text-muted)]">
                                <label htmlFor="profileImage" className="relative cursor-pointer rounded-md bg-[var(--color-bg-component)] font-semibold text-[var(--color-primary)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-bg-component)] hover:text-[var(--color-primary-hover)]">
                                    <span>{profileImage ? 'File selected' : 'Upload a file'}</span>
                                    <input id="profileImage" name="profileImage" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-[var(--color-text-muted)]/80">
                                {profileImage ? profileImage.name : 'PNG, JPG up to 5MB'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="flex w-full justify-center btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
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