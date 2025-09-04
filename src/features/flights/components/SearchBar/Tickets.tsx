import type { Ticket } from '../../mocks/flightSearch.ts'

export const Tickets = ({ results }: { results: Ticket[] }) => {
  return (
    <>
      {results.map((flight) => (
        <div
          key={flight.id}
          className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-6">
            <div className="text-xl font-semibold text-yellow-900 tracking-wider">
              {flight.from} → {flight.to}
            </div>
            <div className="flex flex-col text-sm text-gray-500">
              <span>Departure: {flight.departureDate}</span>
              <span>Return: {flight.returnDate}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">
              ${flight.price}
            </div>
            <button className="mt-1 text-sm text-blue-600 hover:underline">
              View deal
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
