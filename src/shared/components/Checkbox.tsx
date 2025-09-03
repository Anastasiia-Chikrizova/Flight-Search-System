import type { ChangeEvent } from 'react'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer select-none text-sm text-gray-500 font-normal border-gray-300 border-l">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border-2 text-yellow-800 focus:ring-0 rounded-sm ml-4 accent-yellow-800"
      />
      <span>{label}</span>
    </label>
  )
}
