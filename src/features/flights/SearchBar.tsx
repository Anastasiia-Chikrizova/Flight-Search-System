import { type ChangeEvent } from 'react'
import { type FlightClass, useFlightStore } from './store.ts'
// import { searchFlights } from './features/flights/flightService.ts'
import ClientBanner from '../../components/SearchBar/ClientBanner.tsx'
import FlightTypeSelector from '../../components/SearchBar/FlightTypeSelector.tsx'
import { Checkbox } from '../../shared/components/Checkbox.tsx'
import MultiCityForm from '../../components/SearchBar/MultiCityForm.tsx'
import { FlyingDetailsPanel } from '../../components/SearchBar/FlyingDetailsPanel.tsx'
import { Button } from '../../shared/components/Button.tsx'
import Select from '../../shared/components/Select.tsx'

export const classSelectorOptions = [
  { label: 'Economy', value: 'economy' },
  { label: 'Business', value: 'business' },
  { label: 'First', value: 'first' },
]

function SearchBar() {
  // const [results, setResults] = useState<any[]>([])
  const { setState, directOnly, flightType, loading, flightClass } =
    useFlightStore()

  const handleSearch = async () => {
    setState({ loading: true })
    // const flights = await searchFlights(useFlightStore.getState())
    // setResults(flights)
    // setLoading(false)
  }

  const onClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ flightClass: e?.target?.value as FlightClass })
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 p-6 rounded-xl shadow-xl bg-white space-y-6 border border-gray-200">
        <ClientBanner />
        <div className="flex gap-10 mb-10">
          <FlightTypeSelector />
          <div className="border-l border-gray-300 mr-20 pl-5">
            <Select
              onChange={onClassChange}
              value={flightClass}
              options={classSelectorOptions}
            />
          </div>

          <Checkbox
            label="Direct flights only"
            checked={directOnly}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setState({ directOnly: e.target.checked })
            }
          />
        </div>
        <>
          {flightType === 'multi-city' ? (
            <MultiCityForm handleSearch={handleSearch} />
          ) : (
            <div className="flex gap-5 border-b border-gray-200 pb-5 justify-center align-center">
              <FlyingDetailsPanel index={0} />
              <Button
                onClick={handleSearch}
                disabled={loading}
                text={loading ? 'Searching...' : 'Search'}
                color="blue"
                variant="submit"
              />
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default SearchBar
