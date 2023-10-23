import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar'; 
import api, { getCsrfToken } from '../api/apiConfig'; 
import ResultsPage from './ResultsPage';
import yelp from '../api/apiConfig';
import axios from 'axios';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoggedIn = () => {
    const csrfToken = localStorage.getItem('csrf_token');
    return csrfToken != null;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await getCsrfToken(); // Fetch the CSRF token.
      setIsAuthenticated(isLoggedIn()); // Check if the user is authenticated.
    };

    initializeAuth();
  }, []);

  // Function to initiate a predefined search.
  const handlePredefinedSearch = async (searchTerm: string) => {
    try {
      const response = await yelp.get('/businesses/search', {
        params: {
          term: searchTerm,
          location: 'New York City', 
          sort_by: 'best_match',
        },
      });

      navigate('/results', { state: { data: response.data.businesses, term: searchTerm, location: 'New York City' } });
    } catch (error) {
      console.error('Error during predefined search:', error);
    }
  };

  // Handle the logout process.
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post('/logout/', {}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('csrf_token'); // Clear the token.
        setIsAuthenticated(false); // Update auth state.
        navigate('/auth/signin'); // Redirect to signin.
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Render the component.
  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="navbar-link home-link">Home</Link>
        <SearchBar />
        {isAuthenticated ? (
          <Link to="#" onClick={handleLogout} className="navbar-link logout-link">Logout</Link>
        ) : (
          <Link to="/auth/signin" className="navbar-link signin-link">Sign In</Link>
        )}
      </div>
      <div className="navbar-links">
        {/* Predefined search categories. */}
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('restaurants')}>Restaurants</div>
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('bars')}>Bars</div>
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('shopping')}>Shopping</div>
      </div>
    </nav>
  );
};

export default Navbar;
