import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Business from './components/Business';
import ResultsPage from './components/ResultsPage';
import Signup from './components/Signup';
import Review from './components/Review';
import { getCsrfToken } from './api/apiConfig'; // adjust the import path if necessary
import { CookiesProvider } from 'react-cookie';
import GeoLocation from './components/GeoLocation';
// import Carousel from './components/Carousel';
import HomePage from './components/HomePage';


function App() {
  useEffect(() => {
    // Fetch the CSRF token when the app loads
    getCsrfToken();
  }, []);

  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );
}

export default App;
