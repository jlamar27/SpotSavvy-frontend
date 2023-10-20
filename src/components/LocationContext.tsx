import React from 'react';

export type LocationContextType = {
  latitude: number | null;
  longitude: number | null;
  userAddress: string | null;
  error: string | null
  setCoordinates: (latitude: number, longitude: number) => void;
};

// Create a context with default values.
// These will be overwritten by the Provider value.
export const LocationContext = React.createContext<LocationContextType>({
  latitude: null,
  longitude: null,
  userAddress: null,
  error: null,
  setCoordinates: () => {},
});
