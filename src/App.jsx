import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'
import createRouter from './router/createRouter'

export default function App() {
  const { setUser } = useAuth()
  const router = useMemo(() => {
    return createRouter({ setUser })
  }, [])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
