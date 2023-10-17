import React from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Business from './components/Business';


//sign in sign up, home page, results, results:id 

import Signup from './components/Signup';

function App() {

   const handleSearch = (term: string, location: string) => {
    console.log(`Searching for ${term} in ${location}`) 
    // Make our api requests here
   }

  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route></Route>
      <Route></Route>
      <Route path='/biz/:id' element={<Business/>}></Route>
      <Route path='/auth/signup' element={<Signup/>} />
      <Route path="/auth/signin" element={<Signin/>} />
      </Routes>
    </div>
  );
}

export default App;
