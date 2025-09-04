import { ArrowLeftRight, ArrowRight } from 'lucide-react'
import { useFlightStore } from '../../store.ts'
import LocationCombobox from './Autocomplete.tsx'

export const LocationSelect = () => {
  const { destination, origin, flightType, setState } = useFlightStore()

  const swap = () => {
    setState({
      origin: destination,
      destination: origin,
    })
  }

  return (
    <div className="grid grid-cols-3 items-end gap-4 w-full">
      <div className="flex flex-col">
        <LocationCombobox label=" Flying From" direction={'origin'} />
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
        <LocationCombobox label=" Flying To" direction={'destination'} />
      </div>
    </div>
  )
}
