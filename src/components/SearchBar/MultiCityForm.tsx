import { useFlightStore } from '../../features/flights/store'

import { FlyingDetailsPanel } from './FlyingDetailsPanel.tsx'
import { Button } from '../../shared/components/Button.tsx'

interface MultiCityFormProps {
  handleSearch: () => void
}

export default function MultiCityForm({ handleSearch }: MultiCityFormProps) {
  const { segments, addSegment, removeSegment, loading } = useFlightStore()

  return (
    <>
      {segments.map((_, idx) => (
        <div
          key={idx}
          className="flex gap-5 border-b border-gray-200 pb-5 mb-5"
        >
          <FlyingDetailsPanel index={idx} />
          {segments.length > 1 && (
            <Button
              color="red"
              variant="transparent"
              onClick={() => removeSegment(idx)}
              text="Remove"
              weight="semibold"
            />
          )}
        </div>
      ))}
      <div className="flex justify-between">
        <Button
          color="blue"
          variant="transparent"
          onClick={addSegment}
          text={'+ Add another flight'}
          weight="semibold"
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          color="blue"
          variant="submit"
          text={loading ? 'Searching...' : 'Search'}
        />
      </div>
    </>
  )
}
