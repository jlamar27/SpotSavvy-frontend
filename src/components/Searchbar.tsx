import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(term, location);
  };

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
