import { Outlet, redirect } from 'react-router-dom'
import { api } from '../utils/api'
import { deleteToken, token } from '../utils/auth'

export function loader({ setUser }) {
  return async function () {
    if (!token()) return null

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    }

    try {
      const { data } = await api.get('/usuarios/perfil', options)
      setUser(data)

      return redirect('/proyectos')
    } catch (error) {
      deleteToken()
      return null
    }
  }
}

export default function AuthLayout() {
  return (
    <div>
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
