import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'
import mainRouter from './router/createRouter'

export default function App() {
  const { setUser } = useAuth()
  const router = useMemo(() => {
    return mainRouter({ setUser })
  }, [])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
