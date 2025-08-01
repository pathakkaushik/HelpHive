import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Or{' '}
              <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                create an account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-md">{error}</p>}
            <div className="flex flex-col gap-4 rounded-md">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" value={formData.password} onChange={handleChange} />
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
              <button type="submit" className="flex w-full justify-center btn btn-primary" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
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