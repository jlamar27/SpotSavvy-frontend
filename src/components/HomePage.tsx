import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from 'react-router-dom';
// Import your carousel component here
// import Carousel from './path-to-your-carousel-component';

type BusinessData = {
  imageUrl: string;
  name: string;
};

type LocationState = {
  latitude: number | null;
  longitude: number | null;
};

const HomePage: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [data, setData] = useState<BusinessData[]>([]); // This will hold the data fetched from API
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationAndData = async () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        try {
          // Make the API call with the obtained location data
          const response = await axios.get('<API_ENDPOINT>', {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              term: 'food', // or any other term you want to search for
              // Include other parameters required by the API
            },
          });

          if (response.data && response.data.businesses) {
            setData(response.data.businesses);
          } else {
            setError('No data available for your location.');
          }
        } catch (error) {
          setError('Error fetching data from the API.');
        }
      }, () => {
        setError('Unable to retrieve your location.');
      });
    };

    fetchLocationAndData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data.length > 0 ? (
        <div>
          {/* Render your Carousel component here */}
          {/* <Carousel data={data} /> */}
        </div>
      ) : (
        <p>No data available for your location.</p>
      )}
    </div>
  );
};

export default HomePage;
