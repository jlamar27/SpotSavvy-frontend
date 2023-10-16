import React from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar'
import Signup from './components/Signup';

function App() {

   const handleSearch = (term: string, location: string) => {
    console.log(`Searching for ${term} in ${location}`) 
    // Make our api requests here
   }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Searchbar onSearch={handleSearch}/>
    </div>
    hello world
  );
}

export default App;
