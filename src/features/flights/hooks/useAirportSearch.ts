import { useQuery } from '@tanstack/react-query'
import { getAirport } from '../flightService.ts'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue.tsx'

export const useAirportSearch = (
  term: string,
  { delay = 300, enabled = true } = {}
) => {
  const debouncedTerm = useDebouncedValue(term, delay)

  return useQuery({
    queryKey: ['airports', debouncedTerm],
    queryFn: () => getAirport(debouncedTerm),
    enabled: enabled && !!debouncedTerm && term.length > 1,
    staleTime: 1000 * 60 * 5,
  })
}
