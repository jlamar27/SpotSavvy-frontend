import React, { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Business from './components/Business';
import ResultsPage from './components/ResultsPage';
import Signup from './components/Signup';
import api from './http/httpConfig';
import Review from './components/Review';


type Business = {
  id: string;
  name: string;
  // Add other properties based on the actual data structure
};

function App() {
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [location, setLocation] = useState<string>(''); 
  const [term, setTerm] = useState<string>(''); // Initialize term as an empty string


  const handleSearch = async (term: string, location: string) => {
    try {
      const response = await api.get('/businesses/search', {
        params: {
          term: term,
          location: location,
          limit: 20,
        },
      });

      if (response.data && response.data.businesses) {
        setSearchResults(response.data.businesses);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };



  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route></Route>
        <Route path="/reviews/:reviewId" element={<Review />} />
        <Route path='/biz/:id' element={<Business />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        {/* <Route path="/results" element={<ResultsPage term={term} location={location} results={searchResults} />} /> */}
        <Route path="/results" element={<ResultsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
