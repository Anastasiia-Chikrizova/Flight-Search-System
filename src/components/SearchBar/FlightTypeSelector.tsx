import { useFlightStore } from '../../features/flights/store'

const options = ['round-trip', 'one-way', 'multi-city'] as const

export default function FlightTypeSelector() {
  const { flightType, setState } = useFlightStore()

  const renderLabel = (type: string) => {
    switch (type) {
      case 'round-trip':
        return 'Round-trip'
      case 'one-way':
        return 'One way'
      case 'multi-city':
        return 'Multi-city'
      default:
        return type
    }
  }

  return (
    <div className="flex gap-6 text-sm font-medium text-gray-600">
      {options.map((type) => (
        <button
          key={type}
          onClick={() => setState({ flightType: type as any })}
          className="relative pb-1 transition-colors duration-200 hover:text-black focus:outline-none"
        >
          <span className={flightType === type ? 'text-black' : ''}>
            {renderLabel(type)}
          </span>
          {flightType === type && (
            <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-yellow-800"></span>
          )}
        </button>
      ))}
    </div>
  )
}
