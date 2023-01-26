import { Outlet, redirect } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
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
    <div className='bg-gray-100'>
      <Header />
      <div className='md:flex md:min-h-screen '>
        <Sidebar />
        <main className='flex-1 p-10'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
