import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Results from './components/Results'
import Signup from './components/Signup';


//results:id for the results page aka the buisness profile


function App() {

  const [searchResults, setSearchResults] = useState([])
  const handleSearch = async (term: string, location: string) => {
    try {
      const response = await fetch('apikey')
      const data = await response.json();
      setSearchResults(data);
    }catch (error) {
      console.error("There was a problem fetching")
    }
  }

  
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/results" element={<Results results={searchResults} />} /> 
        </Routes>
    </div>
  );
}

export default App;
