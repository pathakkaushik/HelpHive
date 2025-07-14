import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindHelpPage from './pages/FindHelpPage';
import HelperProfilePage from './pages/HelperProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HousehelpSignUpPage from './pages/HousehelpSignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find" element={<FindHelpPage />} />
        <Route path="/helper/:id" element={<HelperProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/househelp-signup" element={<HousehelpSignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;