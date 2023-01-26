import { Link, useLoaderData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { api } from '../utils/api'

export const loader = async ({ params }) => {
  const { id } = params

  try {
    const { data } = await api.get(`/usuarios/confirmar/${id}`)

    return {
      msg: data.message,
      error: false
    }
  } catch (error) {
    return {
      msg: error.response.data.message,
      error: true
    }
  }
}

export default function ConfirmarCuenta() {
  const data = useLoaderData()
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tu cuenta y empieza a crear tus <span className='text-slate-700'>proyectos</span>
      </h1>

      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {data?.msg && <Alerta alerta={data} />}

        {!data?.error && (
          <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  )
}
