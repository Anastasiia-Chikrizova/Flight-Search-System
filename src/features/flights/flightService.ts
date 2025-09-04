import { mockFlights } from './mocks/flightSearch'

export const searchFlights = async (params: {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
}) => {
  console.log('Searching flights with params', params)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockFlights.filter(
          (f) =>
            f.origin === params.origin && f.destination === params.destination
        )
      )
    }, 1000)
  })
}

export const getAirport = async (term: string) => {
  const res = await fetch(
    `https://www.searchapi.io/api/v1/search?api_key=${import.meta.env.VITE_SEARCH_API_KEY}&engine=google_flights_location_search&q=${term}`
  )
  if (!res.ok) throw new Error('Failed to fetch airport')
  return res.json()
}
