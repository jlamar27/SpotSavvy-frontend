import React, { useContext, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Business from './components/Business';
import ResultsPage from './components/ResultsPage';
import Signup from './components/Signup';
import Review from './components/Review';
import { AuthProvider } from './context/authContext';
import GeoLocation from './components/GeoLocation';

type Business = {
  id: string;
  name: string;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <GeoLocation/>
        <Routes>
          <Route path="/reviews/:reviewId" element={<Review />} />
          <Route path='/business/:id' element={<Business />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route
            path="/results"
            element={
              <ResultsPage />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
