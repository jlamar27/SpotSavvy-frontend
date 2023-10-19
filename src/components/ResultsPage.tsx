import React, { useEffect, useState } from 'react';

interface Business {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
}

interface ResultsPageProps {
    term: string;
    location: string;
    data: Business[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ data }) => {
    return (
        <div>
            <h1>Search Results</h1>
            <div className="business-cards">
                {data.map((business: Business) => (
                    <div key={business.id} className="business-card">
                        <div className="business-image">
                            <img src={business.image_url} alt={business.name} />
                        </div>
                        <div className="business-details">
                            <h2 className="business-name">{business.name}</h2>
                            <p>Rating: {business.rating}</p>
                            <p>Review Count: {business.review_count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
export type { Business };
