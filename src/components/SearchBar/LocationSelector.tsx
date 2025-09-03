import { ArrowLeftRight, ArrowRight } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useFlightStore } from '../../features/flights/store.ts'

interface LocationSelectorProps {
  index: number
}

export const LocationSelector = ({ index }: LocationSelectorProps) => {
  const { segments, updateSegment, flightType } = useFlightStore()

  const { destination, origin } = segments[index]

  const swap = () => {
    updateSegment(index, {
      origin: destination,
      destination: origin,
    })
  }
  const onDepartureChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateSegment(index, { origin: e.target.value })

  const onArrivalChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateSegment(index, { destination: e.target.value })

  return (
    <div className="grid grid-cols-3 items-end gap-4 w-full">
      <div className="flex flex-col">
        <label className="text-xs text-yellow-900 tracking-wide font-semibold uppercase mb-1">
          Flying From
        </label>
        <input
          className="text-gray-800 text-lg font-medium bg-transparent focus:outline-none"
          value={origin}
          onChange={onDepartureChange}
        />
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={swap}
          type="button"
          className="text-gray-500 hover:text-black p-2"
          aria-label="Swap"
        >
          {flightType === 'one-way' ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <ArrowLeftRight className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-yellow-900 tracking-wide font-semibold uppercase mb-1">
          Flying To
        </label>
        <input
          className="text-gray-800 text-lg font-medium bg-transparent focus:outline-none"
          value={destination}
          onChange={onArrivalChange}
        />
      </div>
    </div>
  )
}
