import React, { useState, useEffect } from 'react';
import api from '../http/httpConfig';

// Define the type for your business data
type Business = {
  id: string;
  name: string;
  image_url: string;
};

type CarouselProps = {
    data: Business[]
}

const Carousel: React.FC<CarouselProps> = ({data}) => {
//   const [data, setData] = useState<Business[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Fetch geolocation data
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          // Corrected request with template literals
          const response = await api.get(`/businesses/search`, {
            params: {
              term: 'food',
              sort_by: 'best_match',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              limit: 5
            }
          });

          if (response.data && response.data.businesses) {
            // setData(response.data.businesses);
          } else {
            setError('No businesses found');
          }
        } catch (error) {
          // Handle errors from the server
          setError('An error occurred while fetching data');
        } finally {
          setIsLoading(false);
        }
      }, 
      // Error scenario for geolocation fetching
      () => {
        setError('Unable to retrieve your location.');
        setIsLoading(false);
      });
    };

    fetchData();
  }, []);

  // Interval setup for image change
  useEffect(() => {
    if (isLoading || data.length === 0) return;

    const id = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); 

    return () => clearTimeout(id);
  }, [currentImageIndex, data, isLoading]);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="carousel-container">
    {data.map((business, index) => (
      <div 
        key={business.id}
        className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}
      >
        <img 
          src={business.image_url} 
          alt={business.name} 
          className="carousel-image" 
        />
        <div className="carousel-caption">{business.name}</div>
      </div>
    ))}
  </div>

  );
};

export default Carousel;
