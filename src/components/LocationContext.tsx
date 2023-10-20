import React from 'react';

export type LocationContextType = {
  latitude: number | null;
  longitude: number | null;
  userAddress: string | null;
  error: string | null
  setCoordinates: (latitude: number, longitude: number) => void;
};

export const LocationContext = React.createContext<LocationContextType>({
  latitude: null,
  longitude: null,
  userAddress: null,
  error: null,
  setCoordinates: () => {},
});
