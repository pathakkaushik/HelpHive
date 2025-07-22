import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindHelpPage from './pages/FindHelpPage';
import HelperProfilePage from './pages/HelperProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WorkerSignUpPage from './pages/WorkerSignUpPage';
import WorkerLoginPage from './pages/WorkerLoginPage';
import AboutPage from './pages/AboutPage';
import Chatbot from './components/Chatbot';

// Define the paths where the chatbot should NOT appear
const authPaths = [
  '/login',
  '/signup',
  '/worker-login',
  '/worker-signup'
];

// A component that contains the main app logic and can use hooks
const AppContent = () => {
  const location = useLocation();
  const showChatbot = !authPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* User Facing Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/find" element={<FindHelpPage />} />
        <Route path="/helper/:id" element={<HelperProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Worker Facing Routes */}
        <Route path="/worker-signup" element={<WorkerSignUpPage />} />
        <Route path="/worker-login" element={<WorkerLoginPage />} />
      </Routes>
      
      {showChatbot && <Chatbot />}
    </>
  );
};


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;