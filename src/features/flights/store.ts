import { create } from 'zustand'
import type { Actions, State } from './types.ts'

export const useFlightStore = create<State & Actions>((set) => ({
  directOnly: false,
  flightType: 'round-trip',
  origin: 'Heathrow Airport',
  destination: 'Berlin',
  departureDate: '2025-09-25',
  returnDate: '',
  flightClass: 'economy',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  setState: (partial) => set(partial),
}))
