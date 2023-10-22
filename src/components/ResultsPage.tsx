import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Business {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    location: Location;
}

interface Location {
    display_address: string[];
}

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const stateData = location.state?.data || [];
    const term = location.state?.term || '';
    const locationSearch = location.state?.location || '';

    const handleBusinessClick = (businessId: string) => {
        navigate(`/business/${businessId}`);
    };

    return (
        <div>
            <h1>Search Results</h1>
            <div className="business-cards">
                {stateData.map((business: Business) => (
                    <div
                        key={business.id}
                        className="business-card"
                        onClick={() => handleBusinessClick(business.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="business-image">
                            <img src={business.image_url} alt={business.name} />
                        </div>
                        <div className="business-details">
                            <h2 className="business-name">{business.name}</h2>
                            <p>Rating: {business.rating}</p>
                            <p>Reviews: {business.review_count}</p>
                            <p> {business.location.display_address.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
export type { Business };
