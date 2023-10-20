import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import { Business } from './ResultsPage'
import api from '../api/apiConfig';
import { useCookies } from 'react-cookie';

const Navbar: React.FC = () => {
  const [cookie, setCookie, removeCookie]: any = useCookies(['csrftoken'])

  const handleLogout = async (e: any) => {
    e.preventDefault();
    console.log('Logging out...');
    
    try {
      // Set the X-CSRFToken header value
      const csrfToken = localStorage.getItem('csrf_token'); // replace with the method to get your CSRF token
      console.log('This is the current CSRF Token Value', csrfToken)
  
      const response = await api.post('/logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      
      console.log("This is the response:", response.data)
      
      if (response.status === 200) {
        // Redirect to the login or home page after logout
        // window.location.href = '/auth/signin';
        console.log("removing cookie")
        removeCookie('csrftoken');
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
        <Searchbar />
        <Link to="/auth/signin" className="navbar-link signin-link">
          Sign In
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/results" className="navbar-link">
          Restaurants
        </Link>
        <Link to="/results" className="navbar-link">
          Bars
        </Link>
        <Link to="/results" className="navbar-link">
          Shopping
        </Link>
        <Link to="#" onClick={handleLogout} className="navbar-link logout-link">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
