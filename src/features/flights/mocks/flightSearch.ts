export const mockFlights = [
  {
    id: 1,
    from: 'LHR',
    to: 'JFK',
    departureDate: '2025-09-25',
    returnDate: '2025-10-10',
    price: 499,
  },
  {
    id: 2,
    from: 'LHR',
    to: 'JFK',
    departureDate: '2025-09-25',
    returnDate: '2025-10-11',
    price: 599,
  },
  {
    id: 3,
    from: 'LHR',
    to: 'CDG',
    departureDate: '2025-09-25',
    returnDate: '2025-09-30',
    price: 199,
  },
]

export interface Ticket {
  id: number
  from: string
  to: string
  price: number
  departureDate: string
  returnDate: string
}
