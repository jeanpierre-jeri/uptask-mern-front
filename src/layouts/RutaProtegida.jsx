import { Outlet, redirect } from 'react-router-dom'
import { api } from '../utils/api'
import { deleteToken, token } from '../utils/auth'

export function loader({ setUser }) {
  return async function () {
    if (!token()) return redirect('/')

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    }

    try {
      const { data } = await api.get('/usuarios/perfil', options)
      setUser(data)

      return null
    } catch (error) {
      deleteToken()
      return redirect('/')
    }
  }
}

export default function RutaProtegida() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
