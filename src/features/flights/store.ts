import { create } from 'zustand'
import type { Actions, State } from './types.ts'

export const useFlightStore = create<State & Actions>((set) => ({
  loading: false,
  directOnly: false,
  flightType: 'round-trip',
  origin: 'LHR',
  destination: 'JFK',
  departureDate: '2025-09-25',
  returnDate: '',
  flightClass: 'economy',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  passengersSummary: '',
  setState: (partial) => set(partial),
}))
