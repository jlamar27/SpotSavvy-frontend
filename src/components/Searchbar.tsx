import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  onSearch: (term: string, location: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Term:', term);
    console.log('Location:', location);
    await onSearch(term, location);
    navigate('/results')
  };

  const handleSearch = (term: string, location: string) => {
    console.log(`Searching for ${term} in ${location}`) 
    // Make our api requests here
   }

  return (
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
    
  );
};

export default SearchBar; 
