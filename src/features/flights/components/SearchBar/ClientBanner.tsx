import { useEffect, useState } from 'react'
import { getClient, banners } from '../../../../shared/constants/clients.ts'

export default function ClientBanner() {
  const [banner, setBanner] = useState('')

  useEffect(() => {
    const client = getClient()
    setBanner(banners[client] || '')
  }, [])

  if (!banner) return null

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
      {banner}
    </div>
  )
}
