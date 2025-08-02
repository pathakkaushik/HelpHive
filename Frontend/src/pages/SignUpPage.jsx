import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const formItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '',
    street: '', city: '', state: '', zipCode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      await register({ ...formData, role: 'USER' });
      toast.success("Registration successful! Please log in.", { id: toastId });
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col bg-[var(--color-bg)]"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Hexagon className="mx-auto h-12 w-auto text-[var(--color-primary)]" fill="currentColor" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-text-strong)]">Create a new account</h2>
            <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">Sign in</Link>
            </p>
          </motion.div>
          <motion.form
            className="mt-8 space-y-6 rounded-lg border bg-[var(--color-bg-component)] p-8 shadow-lg"
            onSubmit={handleSubmit}
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <motion.div variants={formItemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Full Name</label>
                <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Email address</label>
                <input name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Password</label>
                <input name="password" type="password" required value={formData.password} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Phone Number</label>
                <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
              </motion.div>

              <motion.div variants={formItemVariants} className="md:col-span-2 mt-4 border-t border-[var(--color-border)] pt-4">
                <h3 className="text-base font-semibold leading-6 text-[var(--color-text-strong)]">Mailing Address</h3>
                <p className="text-sm text-[var(--color-text-muted)]">This is required for all users for verification and security.</p>
              </motion.div>

              <motion.div variants={formItemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Street Address</label>
                <input name="street" type="text" required value={formData.street} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">City</label>
                <input name="city" type="text" required value={formData.city} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">State</label>
                <input name="state" type="text" required value={formData.state} onChange={handleChange} />
              </motion.div>
              <motion.div variants={formItemVariants} className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-[var(--color-text)]">Zip Code</label>
                <input name="zipCode" type="text" required value={formData.zipCode} onChange={handleChange} />
              </motion.div>
            </div>
            <motion.div variants={formItemVariants} className="pt-4">
              <button type="submit" className="flex w-full justify-center btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default SignUpPage;