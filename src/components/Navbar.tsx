import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

interface NavbarProps {
  onSearch: (term: string, location: string) => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="navbar-link home-link">Home</Link>
        <SearchBar onSearch={onSearch} />
        <Link to="/auth/signin" className="navbar-link signin-link">Sign In</Link>
      </div>
      <div className="navbar-links">
        <Link to="/results" className="navbar-link">Restaurants</Link>
        <Link to="/results" className="navbar-link">Bars</Link>
        <Link to="/results" className="navbar-link">Shopping</Link>
      </div>
    </nav>
  );
};

export default Navbar;
