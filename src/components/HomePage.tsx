import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import api from '../http/httpConfig'

type BusinessData = {
  id: string;
  image_url: string; 
  name: string;
};

type LocationState = {
  latitude: number | null;
  longitude: number | null;
};

const HomePage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [data, setData] = useState<BusinessData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchLocationAndData = async () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        try {
          const response = await api.get(`/businesses/search?term=food&sort_by=best_match&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&limit=5`);

          if (response.data && response.data.businesses) {
            const formattedData = response.data.businesses.map((business: any) => ({
              id: business.id,
              image_url: business.image_url, 
              name: business.name,
            }));
            setData(formattedData); 
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
      {data.length > 0 && location.pathname === '/' ? (
        <div>
          <Carousel data={data} />
        </div>
      ) : (
        <p>No data available for your location.</p>
      )}
    </div>
  );
};

export default HomePage;
