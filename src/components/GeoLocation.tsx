import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import  { LocationContext, LocationContextType } from './LocationContext'; 

interface GeoLocationProps {
    children: ReactNode;
}

const GeoLocation: React.FC<GeoLocationProps> = ({ children }) => {
  const [location, setLocation] = useState<Omit<LocationContextType, 'setCoordinates'>>({
    latitude: null,
    longitude: null,
    userAddress: null,
    error: null,
  });

  // Define the function that updates the coordinates. We use useCallback to avoid its reference changing on every render.
  const setCoordinates = useCallback((latitude: number, longitude: number) => {
    setLocation((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  }, []); // No dependencies, so this function reference never changes.

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by your browser.',
      }));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates(latitude, longitude);
        },
        () => {
          setLocation((prevState) => ({
            ...prevState,
            error: 'Unable to retrieve your location.',
          }));
        }
      );
    }
  }, [setCoordinates]); // Dependency on setCoordinates since we're using it in this effect.

  // Including 'setCoordinates' in the value provided to the Provider, as it's part of the context value expected by consumers.
  const contextValue = {
    ...location,
    setCoordinates,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default GeoLocation;
