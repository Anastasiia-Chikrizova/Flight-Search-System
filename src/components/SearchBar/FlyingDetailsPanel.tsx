import DateSelector from './DateSelector'
import { LocationSelector } from './LocationSelector'
import PassengerClassSelector from './PassengerClassSelector'

interface FlyingDetailsPanelProps {
  index: number
}

export const FlyingDetailsPanel = ({ index }: FlyingDetailsPanelProps) => {
  return (
    <>
      <LocationSelector index={index} />
      <DateSelector idx={index} />
      <PassengerClassSelector />
    </>
  )
}
