import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { type FlightClass, useFlightStore } from '../../features/flights/store'
import Select from '../../shared/components/Select.tsx'
import { classSelectorOptions } from '../../features/flights/SearchBar.tsx'

const classLabels: Record<string, string> = {
  economy: 'economy',
  business: 'business',
  first: 'first',
}

export default function PassengerClassSelector() {
  const { flightClass, passengers, setState } = useFlightStore()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const {
    adults = 1,
    children = 0,
    infants = 0,
    infantsWithSeat = 0,
  } = passengers || {}

  const onClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ flightClass: e?.target?.value as FlightClass })
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const renderSummary = () => {
    const parts = []
    if (adults) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`)
    if (children) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`)
    if (infants) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`)
    if (infantsWithSeat)
      parts.push(
        `${infantsWithSeat} Infant${infantsWithSeat > 1 ? 's' : ''} w/ seat`
      )
    return parts.join(', ') + `, ${classLabels[flightClass]}`
  }

  const update = (key: keyof typeof passengers, delta: number) => {
    setState({
      passengers: {
        ...passengers,
        [key]: Math.max(0, (passengers?.[key] ?? 0) + delta),
      },
    })
  }

  const group = (label: string, sub: string, key: keyof typeof passengers) => (
    <div className="flex items-center justify-between text-sm py-2">
      <div>
        <div className="text-gray-900 font-medium">{label}</div>
        <div className="text-gray-500 text-xs">{sub}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => update(key, -1)}
          className="w-6 h-6 border rounded text-gray-500 hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-6 text-center">{passengers?.[key] ?? 0}</span>
        <button
          onClick={() => update(key, 1)}
          className="w-6 h-6 border rounded text-gray-500 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  )

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col text-left w-full"
      >
        <span className="text-xs text-yellow-900 tracking-widest uppercase mb-1 font-semibold">
          Passengers & Cabin Class
        </span>
        <span className="text-sm text-gray-900 font-medium">
          {renderSummary()}
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow-md p-4 space-y-4 text-sm">
          {group('Adults', 'Age 12+', 'adults')}
          {group('Children', 'Age 2–11', 'children')}
          {group('Infants', 'Under 2 years', 'infants')}
          {group('Infants with Seat', 'Under 2 years', 'infantsWithSeat')}

          <div className="flex flex-col pt-2 border-t border-gray-100">
            <label className="text-sm text-gray-700 font-medium mb-1">
              Cabin Class
            </label>
            <Select
              onChange={onClassChange}
              value={flightClass}
              options={classSelectorOptions}
            />
          </div>
        </div>
      )}
    </div>
  )
}
