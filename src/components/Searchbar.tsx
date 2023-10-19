import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsPage from './ResultsPage';
import {Business} from './ResultsPage'
import api from '../http/httpConfig';


const SearchBar: React.FC =() => {
  const [data, setData] = useState<[]>([]);
  const [term, setTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await api.get(`/businesses/search?location=${location}&term=${term}&sort_by=best_match`)
        setData(response.data.businesses)
        console.log(data)
        navigate('/results', { state: { data: response.data.businesses, term: term, location: location } });
      } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* <ResultsPage term={term} location={location} data={data} /> */}
    </div>
  );
};

export default SearchBar;
