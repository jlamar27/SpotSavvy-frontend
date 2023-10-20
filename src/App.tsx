// App.tsx
import React from 'react';
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
import Carousel from './components/Carousel';
import HomePage from './components/HomePage';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
         
       <GeoLocation>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:businessId/reviews/:reviewId" element={<Review />} />
          <Route path='/business/:id' element={<Business />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </GeoLocation>
      </div>
    </AuthProvider>
  );
}

export default App;
