import React from 'react';

// Props type
interface ResultsPageProps {
  results: any[]; 
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
  
  return (
    <div>
      <h1>Results</h1>
      {/* Map through results and render them */}
      {results.map((result, index) => (
        <div key={index}>
          {/* content of each result */}
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
