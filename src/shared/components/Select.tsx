import { ChevronDown } from 'lucide-react'
import type { ChangeEvent } from 'react'

interface ClassSelectorProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value: string
  options: { label: string; value: string }[]
}

export default function Select({
  onChange,
  value,
  options,
}: ClassSelectorProps) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none  pr-8 py-2 bg-transparent text-sm text-gray-800  font-medium focus:outline-none cursor-pointer "
        value={value}
        onChange={onChange}
      >
        {options.map((option: { label: string; value: string }) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
    </div>
  )
}
