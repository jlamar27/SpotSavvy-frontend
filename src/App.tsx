import React, { useContext, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Business from './components/Business';
import ResultsPage from './components/ResultsPage';
import Signup from './components/Signup';
import Review from './components/Review';

type Business = {
  id: string;
  name: string;
};

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route></Route>
        <Route path="/reviews/:reviewId" element={<Review />} />
        <Route path='/biz/:id' element={<Business />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route
          path="/results"
          element={
            <ResultsPage
              term={''}
              location={''}
              data={[]}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
