export type PassengerCounts = {
  adults: number
  children: number
  infants: number
}

export type FlightType = 'round-trip' | 'one-way'

export type FlightClass = 'economy' | 'business' | 'first'

export type State = {
  flightType: FlightType
  origin: string
  destination: string
  departureDate: string
  returnDate: string
  flightClass: FlightClass
  passengers: PassengerCounts
  directOnly: boolean
}

export type Actions = {
  setState: (partial: Partial<State>) => void
}

export interface Airport {
  type: 'airport'
  kgmid: string
  airport_code: string
  title: string
  city: string
  distance?: string
  full_name: string
  short_name: string
}

export interface Location {
  type: 'city' | 'region'
  kgmid: string
  full_name: string
  short_name: string
  description: string
  airports?: Airport[]
  airport_code: string
  title: string
}
