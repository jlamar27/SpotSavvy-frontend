import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { LocationContext } from './LocationContext';
import api from '../http/httpConfig';

type Business = {
  id: string;
  name: string;
  image_url: string;
};

const Carousel: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselData, setCarouselData] = useState<Business | null>(null);

  const { latitude, longitude } = useContext(LocationContext);

  useEffect(() => {
    if (latitude && longitude) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const result = await fetchBusinesses(latitude, longitude, setCarouselData);
          setBusinesses(result);
        } catch (error) {
          console.error("An error occurred while fetching businesses:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // Create a timer to switch images every 3 seconds
    const timer = setInterval(() => {
      if (businesses.length > 0) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === businesses.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [businesses]);

  if (isLoading) {
    return <div></div>;
  }

  const currentBusiness = businesses[currentImageIndex];

  return (
    <div className="carousel-container">
      {currentBusiness ? (
        <div className="carousel-item">
          <img src={currentBusiness.image_url} alt={currentBusiness.name} />
          <div className="business-name">{currentBusiness.name}</div>
        </div>
      ) : (
        <p>No businesses found. Try a different location.</p>
      )}
    </div>
  );
};

async function fetchBusinesses(latitude: number, longitude: number, setCarouselData: any): Promise<Business[]> {
  try {
    const response = await api.get(`/businesses/search?term=food&sort_by=best_match&latitude=${latitude}&longitude=${longitude}&limit=5`);
    const responseData = response.data;

    if (responseData && responseData.businesses) {
      setCarouselData(responseData.businesses[0]);
      return responseData.businesses;
    } else {
      console.error("No businesses found in the response data.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching businesses:", error);
    return [];
  }
}

export default Carousel;
