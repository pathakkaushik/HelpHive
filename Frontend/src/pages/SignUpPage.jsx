import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ ...formData, role: 'USER' });
      // On success, redirect to login page with a success message
      navigate('/login', { state: { message: "Registration successful! Please log in." } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Hexagon className="mx-auto h-12 w-auto text-[var(--color-primary)]" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-text-strong)]">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                Sign in
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-md">{error}</p>}
            <div className="flex flex-col gap-4 rounded-md">
               <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <input id="fullName" name="fullName" type="text" required placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
             <p className="text-center text-xs text-[var(--color-text-muted)]">
              By creating an account, you agree to our <a href="#" className="font-medium text-[var(--color-text)] hover:underline">Terms of Service</a>.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;