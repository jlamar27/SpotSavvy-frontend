import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

export default function Navbar() {
  const handleSearch = async (term: string, location: string) => {
    console.log(`Term: ${term}, location: ${location}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="navbar-link home-link">Home</Link>
        <SearchBar onSearch={handleSearch} />
        <Link to="/auth/signin" className="navbar-link signin-link">Sign In</Link>
      </div>
      <div className="navbar-links">
        <Link to="/results" className="navbar-link">Restaurants</Link>
        <Link to="/results" className="navbar-link">Bars</Link>
        <Link to="/results" className="navbar-link">Shopping</Link>
      </div>
    </nav>
  );
}
