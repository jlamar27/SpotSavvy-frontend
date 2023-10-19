import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Business {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    location: Location; // This refers to your custom 'Location' interface, not 'useLocation'
}


interface Location {
    display_address: string[]; // Assuming 'display_address' is an array of strings
}

// You no longer need 'ResultsPageProps' because you're not receiving these as props anymore

const ResultsPage: React.FC = () => { // Removed '<ResultsPageProps>' because it's no longer needed
    const location = useLocation(); // This should be a function call
    const navigate = useNavigate();

    // These details are now coming from the location state, not props
    const stateData = location.state?.data || [];
    const term = location.state?.term || '';
    const locationSearch = location.state?.location || '';

    const handleBusinessClick = (businessId: string) => {
        navigate(`/business/${businessId}`); 
    };

    return (
        <div>
            <h1>Search Results</h1>
            {/* ... rest of your component */}
            <div className="business-cards">
                {stateData.map((business: Business) => ( // Using 'stateData' instead of 'data'
                    <div key={business.id}
                         className="business-card"
                         onClick={()=> handleBusinessClick(business.id)}
                         style={{ cursor: 'pointer'}}>
                        <div className="business-image">
                            <img src={business.image_url} alt={business.name} />
                        </div>
                        <div className="business-details">
                            <h2 className="business-name">{business.name}</h2>
                            <p>Rating: {business.rating}</p>
                            <p>Review Count: {business.review_count}</p>
                            <p>Address: {business.location.display_address.join(', ')}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
export type { Business }
