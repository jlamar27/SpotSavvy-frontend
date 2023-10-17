import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './Searchbar'

export default function Navbar() {

    const handleSearch = async (term: string, location: string) => {
        console.log(`Term: ${term}, location: ${location}`)
    }
  return (
    <nav className="navbar">
        <SearchBar onSearch={handleSearch}/>
        <button className="navbar">
            <Link to="/">Home</Link>
        </button>
        <button className="navbar">
            <Link to="/auth/signin">Sign In</Link>
        </button>
        <button className="navbar">
            <Link to="/results">Restaurants</Link>
        </button>
        <button className="navbar">
            <Link to="/results">Bars</Link>
        </button>
        <button className="navbar">
            <Link to="/results">Shopping</Link>
        </button>
       
    </nav>
  )
}
