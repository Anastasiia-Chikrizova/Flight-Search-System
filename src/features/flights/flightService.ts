import { mockFlights } from './handlers/flightSearch';

export const searchFlights = async (params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
}) => {
  console.log('Searching flights with params', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFlights.filter(f => f.origin === params.origin && f.destination === params.destination));
    }, 1000);
  });
};