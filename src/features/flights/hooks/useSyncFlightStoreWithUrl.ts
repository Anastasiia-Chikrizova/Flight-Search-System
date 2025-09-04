import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useFlightStore } from '../store'
import {
  buildSearchParams,
  parseSearchParams,
} from '../utils/searhParamsUtil.ts'

export function useSyncFlightStoreWithUrl() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const state = useFlightStore()
  const setState = useFlightStore((s) => s.setState)

  useEffect(() => {
    const parsed = parseSearchParams(searchParams)
    setState(parsed)
  }, [])

  useEffect(() => {
    const params = buildSearchParams(state).toString()
    const current = window.location.search.slice(1)
    if (params !== current) {
      navigate(`?${params}`, { replace: true })
    }
  }, [state])
}
