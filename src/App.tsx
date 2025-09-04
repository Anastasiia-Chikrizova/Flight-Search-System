import './index.css'

import SearchBar from './features/flights/SearchBar.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchBar />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}
