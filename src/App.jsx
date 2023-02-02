import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'
import createRouter from './router/createRouter'
import { ProyectosProvider } from './context/proyectos.context'
import useProyectos from './hooks/useProyectos.js'

export default function App() {
  const { setUser } = useAuth()
  const { setProyectos } = useProyectos()
  const router = useMemo(() => {
    return createRouter({ setUser, setProyectos })
  }, [])
  return (
    <div>
      <ProyectosProvider>
        <RouterProvider router={router} />
      </ProyectosProvider>
    </div>
  )
}
