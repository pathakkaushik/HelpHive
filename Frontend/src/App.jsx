import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindHelpPage from './pages/FindHelpPage';
import HelperProfilePage from './pages/HelperProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WorkerSignUpPage from './pages/WorkerSignUpPage';
import WorkerLoginPage from './pages/WorkerLoginPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // Import Admin page
import Chatbot from './components/Chatbot';
import { Toaster } from 'react-hot-toast'; // Import Toaster

// Define the paths where the chatbot should NOT appear
const authPaths = [
  '/login',
  '/signup',
  '/worker-login',
  '/worker-signup'
];

function App() {
  const location = useLocation();
  const showChatbot = !authPaths.includes(location.pathname);

  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'dark:bg-slate-700 dark:text-white',
        }}
      />
      <Routes>
        {/* All your Route components go here as before */}
        <Route path="/" element={<HomePage />} />
        <Route path="/find" element={<FindHelpPage />} />
        <Route path="/helper/:id" element={<HelperProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/worker-signup" element={<WorkerSignUpPage />} />
        <Route path="/worker-login" element={<WorkerLoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
      
      {showChatbot && <Chatbot />}
    </>
  );
}

export default App;