import { useQuery } from '@tanstack/react-query'

import type { State } from '../types.ts'
import { mockFlights, type Ticket } from '../mocks/flightSearch.ts'

export const getTickets = async (value: State): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  console.log(value)
  return mockFlights
}

export const useAirportSearch = () =>
  useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      throw new Error(
        'Do not use directly. Use queryClient.fetchQuery instead.'
      )
    },
    enabled: false,
  })
