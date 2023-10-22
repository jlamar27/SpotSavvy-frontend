import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar'; // Please ensure this import is correct based on your file structure.
import api from '../api/apiConfig'; // Adjust if your import is different.
import yelp from '../http/httpConfig'; // Adjust if your import is different.
import { useCookies } from 'react-cookie';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(['csrftoken']);

  // Function to initiate a predefined search.
  const handlePredefinedSearch = async (searchTerm: string) => {
    try {
      // This example uses a fixed location, adjust as necessary for your needs.
      const response = await yelp.get('/businesses/search', {
        params: {
          term: searchTerm,
          location: 'New York City', 
          sort_by: 'best_match',
        },
      });

      // Redirecting to the results page with the obtained data.
      navigate('/results', { state: { data: response.data.businesses, term: searchTerm, location: 'New York City' } });
    } catch (error) {
      console.error('Error during predefined search:', error);
    }
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    console.log('Logging out...');

    try {
      const csrfToken = localStorage.getItem('csrf_token'); 
      console.log('This is the current CSRF Token Value', csrfToken)

      const response = await api.post('/logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      console.log("This is the response:", response.data)

      if (response.status === 200) {
        // Redirect to the login or home page after logout
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="navbar-link home-link">
          Home
        </Link>
        <SearchBar />
        <Link to="/auth/signin" className="navbar-link signin-link">
          Sign In
        </Link>
      </div>
      <div className="navbar-links">
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('restaurants')}>
          Restaurants
        </div>
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('bars')}>
          Bars
        </div>
        <div role="link" className="navbar-link" onClick={() => handlePredefinedSearch('shopping')}>
          Shopping
        </div>
        <Link to="#" onClick={handleLogout} className="navbar-link logout-link">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
