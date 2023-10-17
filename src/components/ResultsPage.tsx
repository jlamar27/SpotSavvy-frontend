import React, { useEffect, useState } from 'react';
import api from '../http/httpConfig';

interface Business {
  id: string;
  name: string;
  // Add other properties of a Business here as needed
}

interface ResultsPageProps {
  term: string;
  location: string;
  results: Business[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ term, location }) => {
  const [results, setResults] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch search results
  async function fetchResults() {
    try {
      const response = await api.get('/businesses/search', {
        params: {
          term: term,
          location: location,
          limit: 20,
        },
      });

      if (response.data && response.data.businesses) {
        setResults(response.data.businesses);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err: any) { // Explicitly type 'err' as 'any'
      setError(err.message || 'An unknown error occurred');
      console.error('There was an error fetching the data: ', err);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchResults();
  }, [term, location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Search Results</h1>
      {results.map((business) => (
        <div key={business.id}>
          <h2>{business.name}</h2>
          {/* Add other business details you want to display here */}
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
