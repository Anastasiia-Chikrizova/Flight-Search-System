import { Globe, MapPin, Plane } from 'lucide-react'

export const getIcon = (type: string) => {
  switch (type) {
    case 'airport':
      return <Plane className="w-4 h-4 text-gray-500" />
    case 'city':
      return <MapPin className="w-4 h-4 text-gray-500" />
    case 'region':
      return <Globe className="w-4 h-4 text-gray-500" />
    default:
      return null
  }
}
