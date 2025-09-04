import { Combobox } from '@headlessui/react'
import { type ChangeEvent, useState } from 'react'
import { useFlightStore } from '../../store.ts'
import { useAirportSearch } from '../../hooks/useAirportSearch.ts'
import { getIcon } from './helpers/GetIcon.tsx'
import type { Airport, Location } from '../../types.ts'

interface LocationComboboxProps {
  label: string
  direction: string
}

export default function LocationCombobox({
  label,
  direction,
}: LocationComboboxProps) {
  const [selected, setSelected] = useState<
    Location | Airport | undefined | null
  >(undefined)

  const [term, setTerm] = useState('')
  const { setState } = useFlightStore()
  const { data, isLoading, error } = useAirportSearch(term)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value
    // setState({ [direction]: q })
    setTerm(q)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <label className="text-xs text-yellow-900 tracking-wide font-semibold uppercase mb-1">
            {label}
          </label>
          <Combobox.Input
            className="text-gray-800 text-lg font-medium bg-transparent focus:outline-none"
            displayValue={(item: Location | Airport) =>
              item.type === 'airport' ? item.title : item.full_name
            }
            onChange={handleChange}
          />
          <Combobox.Options className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5">
            {data?.locations?.map((loc: Location) => (
              <>
                <Combobox.Option
                  key={loc.kgmid}
                  value={loc}
                  className={({ focus }) =>
                    `cursor-pointer select-none px-4 py-2 flex items-start gap-2 ${focus ? 'bg-gray-100' : ''}`
                  }
                >
                  <div className="mt-0.5">{getIcon(loc.type)}</div>
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900 font-medium">
                      {loc.full_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {loc.description}
                    </span>
                  </div>
                </Combobox.Option>

                {loc?.airports?.map((airport: Airport) => (
                  <Combobox.Option
                    key={airport.airport_code}
                    value={airport}
                    className={({ focus }) =>
                      `cursor-pointer select-none px-8 py-2 flex items-start gap-2 ${focus ? 'bg-gray-50' : ''}`
                    }
                  >
                    <div className="mt-0.5">{getIcon('airport')}</div>
                    <div className="flex flex-col text-left">
                      <span className="text-gray-900 font-medium">
                        {airport.title}{' '}
                        <span className="text-gray-500 text-sm">
                          {airport.airport_code}
                        </span>
                      </span>
                      {airport.distance && (
                        <span className="text-xs text-gray-500">
                          {airport.distance} to destination
                        </span>
                      )}
                    </div>
                  </Combobox.Option>
                ))}
              </>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}
