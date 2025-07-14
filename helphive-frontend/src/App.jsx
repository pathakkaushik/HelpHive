import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindHelpPage from './pages/FindHelpPage';
import HelperProfilePage from './pages/HelperProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WorkerSignUpPage from './pages/WorkerSignUpPage';
import WorkerLoginPage from './pages/WorkerLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Facing Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/find" element={<FindHelpPage />} />
        <Route path="/helper/:id" element={<HelperProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Worker Facing Routes */}
        <Route path="/worker-signup" element={<WorkerSignUpPage />} />
        <Route path="/worker-login" element={<WorkerLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;