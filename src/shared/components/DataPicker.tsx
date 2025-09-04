import { useState, useRef, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type Props = {
  date: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
  align?: 'left' | 'right'
  disabled?: boolean
}

export default function DatePicker({
  date,
  onChange,
  label,
  placeholder = 'Select a date',
  align = 'left',
  disabled,
}: Props) {
  const selected = date ? parseISO(date) : undefined
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`relative flex flex-col ${
        align === 'right' ? 'items-end' : ''
      }`}
      ref={ref}
    >
      <span className="text-xs text-yellow-900 tracking-widest uppercase mb-1 font-semibold">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`text-sm font-medium focus:outline-none ${
          selected ? 'text-gray-900' : 'italic text-yellow-900'
        } ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        disabled={disabled}
      >
        {selected ? format(selected, 'dd MMM yyyy') : placeholder}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-md">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, 'yyyy-MM-dd'))
                setOpen(false)
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
