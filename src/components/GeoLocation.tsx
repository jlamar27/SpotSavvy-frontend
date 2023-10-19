import React, { useEffect, useState } from 'react';

type LocationState = {
    latitude: number | null;
    longitude: number | null;
    userAddress: string | null; 
};

const GeoLocation: React.FC = () => {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        userAddress: null,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
        } else {
            setError(null);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        userAddress: null, 
                    });
                    // Here you could add a call to another function that translates the latitude and longitude into a human-readable address, if needed.
                },
                () => {
                    setError('Unable to retrieve your location.');
                }
            );
        }
    }, []); 

    return (
        <div>
            <h2>User Location:</h2>
            {error && <p>{error}</p>}
            <ul>
                <li>Latitude: {location.latitude}</li>
                <li>Longitude: {location.longitude}</li>
                {/* Display the address, if available */}
                {/* <li>Address: {location.userAddress}</li> */}
            </ul>
        </div>
    );
};

export default GeoLocation;
