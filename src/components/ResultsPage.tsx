import React, { useEffect, useState } from 'react';
import api from '../http/httpConfig';



interface Business {
    id: string;
    name: string;
}

interface ResultsPageProps {
    term: string;
    location: string;
    data:[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ data }) => {
    const [results, setResults] = useState<Business[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    }, [data]);

    return (
        <div>
            <h1>Search Results</h1>
            {data.map((business: Business) => (
                <div key={business.id}>
                    <h2>{business.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default ResultsPage;
export type { Business } 