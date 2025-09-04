import { Combobox } from '@headlessui/react'
import { type ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useAirportSearch } from '../../hooks/useAirportSearch.ts'
import { getIcon } from './helpers/GetIcon.tsx'
import type { Airport, Location } from '../../types.ts'
import { useFlightStore } from '../../store.ts'

interface LocationComboboxProps {
  label: string
  direction: string
}

export default function LocationCombobox({
  label,
  direction,
}: LocationComboboxProps) {
  const { setState, origin, destination } = useFlightStore()
  const [selected, setSelected] = useState<string>(
    direction === 'origin' ? origin : destination
  )

  const [term, setTerm] = useState('')

  const { data } = useAirportSearch(term)

  useEffect(() => {
    setSelected(direction === 'origin' ? origin : destination)
  }, [direction, origin, destination])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value
    setTerm(q)
  }

  const onSelect = (selected: Airport | Location) => {
    const newDirection =
      selected?.short_name || selected?.airport_code || selected?.title || ''
    setSelected(newDirection)
    setState({
      [direction]: newDirection,
    })
  }

  return (
    <div>
      <Combobox value={selected} onChange={onSelect as any}>
        <div className="relative">
          <label className="block text-xs text-yellow-900 tracking-wide font-semibold uppercase mb-1">
            {label}
          </label>
          <Combobox.Input
            className=" text-gray-900 text-m  bg-transparent focus:outline-none placeholder:text-gray-400 min-w-[100px]"
            displayValue={(item: string) => item}
            onChange={handleChange}
            placeholder="Flying from"
          />
          {data?.locations?.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-2 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 min-w-[240px]">
              {data.locations.map((loc: Location) => (
                <Fragment key={loc.kgmid}>
                  <Combobox.Option
                    value={loc}
                    className={({ focus }) =>
                      `cursor-pointer select-none px-4 py-2 flex items-start gap-3 ${
                        focus ? 'bg-gray-100' : ''
                      }`
                    }
                  >
                    <div className="mt-0.5 text-gray-500">
                      {getIcon(loc.type)}
                    </div>
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
                        `cursor-pointer select-none px-10 py-2 flex items-start gap-3 ${
                          focus ? 'bg-gray-50' : ''
                        }`
                      }
                    >
                      <div className="mt-0.5 text-gray-500">
                        {getIcon('airport')}
                      </div>
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
                </Fragment>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  )
}
