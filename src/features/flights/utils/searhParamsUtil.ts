import type { State } from '../types'

export function parseSearchParams(
  searchParams: URLSearchParams
): Partial<State> {
  return {
    origin: searchParams.get('origin') ?? undefined,
    destination: searchParams.get('destination') ?? undefined,
    departureDate: searchParams.get('departureDate') ?? undefined,
    returnDate: searchParams.get('returnDate') ?? '',
    flightType: searchParams.get('flightType') as State['flightType'],
    directOnly: searchParams.get('directOnly') === 'true',
    flightClass: searchParams.get('flightClass') as State['flightClass'],
    passengers: {
      adults: Number(searchParams.get('adults') ?? 1),
      children: Number(searchParams.get('children') ?? 0),
      infants: Number(searchParams.get('infants') ?? 0),
    },
  }
}

export function buildSearchParams(state: State): URLSearchParams {
  const params = new URLSearchParams()

  params.set('origin', state.origin)
  params.set('destination', state.destination)
  params.set('departureDate', state.departureDate)
  if (state.returnDate) params.set('returnDate', state.returnDate)
  params.set('flightType', state.flightType)
  params.set('directOnly', String(state.directOnly))
  params.set('flightClass', state.flightClass)

  const { adults, children, infants } = state.passengers

  if (adults > 0) params.set('adults', adults.toString())
  if (children > 0) params.set('children', children.toString())
  if (infants > 0) params.set('infants', infants.toString())

  return params
}
