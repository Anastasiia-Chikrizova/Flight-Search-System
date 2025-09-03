import { create } from 'zustand'

type PassengerCounts = {
  adults: number
  children: number
  infants: number
  infantsWithSeat: number
}

export type Segment = {
  origin: string
  destination: string
  departureDate: string
  returnDate: string
}

type FlightType = 'round-trip' | 'one-way' | 'multi-city'

export type FlightClass = 'economy' | 'business' | 'first'

type State = {
  flightType: FlightType
  segments: Segment[]
  flightClass: FlightClass
  passengers: PassengerCounts
  directOnly: boolean
  loading: boolean
}

type Actions = {
  setState: (partial: Partial<State>) => void
  addSegment: () => void
  removeSegment: (index: number) => void
  updateSegment: (index: number, segment: Partial<Segment>) => void
}

export const useFlightStore = create<State & Actions>((set) => ({
  loading: false,
  directOnly: false,
  flightType: 'round-trip',
  segments: [
    {
      origin: 'LHR',
      destination: 'JFK',
      departureDate: '2025-09-25',
      returnDate: '',
    },
  ],
  flightClass: 'economy',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
    infantsWithSeat: 0,
  },
  setState: (partial) => set(partial),
  addSegment: () =>
    set((state) => ({
      segments: [
        ...state.segments,
        { origin: '', destination: '', departureDate: '', returnDate: '' },
      ],
    })),
  removeSegment: (index) =>
    set((state) => ({
      segments: state.segments.filter((_, i) => i !== index),
    })),
  updateSegment: (index = 0, segment) =>
    set((state) => {
      const newSegments = [...state.segments]
      newSegments[index] = { ...newSegments[index], ...segment }
      return { segments: newSegments }
    }),
}))
