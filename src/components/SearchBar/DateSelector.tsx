import DatePicker from '../../shared/components/DataPicker.tsx'
import { useFlightStore } from '../../features/flights/store.ts'

interface DateSelectorProps {
  idx: number
}

export default function DateSelector({ idx }: DateSelectorProps) {
  const { segments, updateSegment, flightType } = useFlightStore()

  const onReturnDateChange = (date: string) => {
    updateSegment(idx, { returnDate: date })
  }

  const onDepartureDateChange = (date: string) => {
    updateSegment(idx, { departureDate: date })
  }

  return (
    <div className="grid grid-cols-3 items-center w-full border-l border-gray-200 border-r pl-4 pr-4">
      <div className="flex flex-col ject-center items-start">
        <DatePicker
          label="Departure"
          date={segments[idx].departureDate}
          onChange={onDepartureDateChange}
        />
      </div>
      <div className="text-gray-400 mb-3 select-none flex justify-center items-center">
        —
      </div>
      <div className="flex flex-col  items-start">
        <DatePicker
          label="Arrival"
          date={segments[idx].returnDate}
          onChange={onReturnDateChange}
          disabled={flightType === 'one-way'}
        />
      </div>
    </div>
  )
}
