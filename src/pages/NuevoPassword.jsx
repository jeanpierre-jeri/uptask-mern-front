import { useEffect, useRef } from 'react'
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { api } from '../utils/api'

export const loader = async ({ params }) => {
  const { token } = params
  try {
    const { data } = await api.get(`/usuarios/olvide-password/${token}`)

    return {
      msg: data.message,
      success: true
    }
  } catch (error) {
    return {
      msg: error.response.data.message,
      error: true
    }
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()

  const { password } = Object.fromEntries(formData)

  if (password.length < 6) {
    return {
      msg: 'El password debe ser minimo 6 caracteres',
      error: true
    }
  }

  const { token } = params

  try {
    const { data } = await api.post(`/usuarios/olvide-password/${token}`, { password })

    return {
      msg: data.message,
      sent: true
    }
  } catch (error) {
    return {
      msg: error.response.data.message,
      error: true
    }
  }
}

export default function NuevoPassword() {
  const data = useLoaderData()
  const form = useRef()
  const actionData = useActionData()

  useEffect(() => {
    if (actionData?.sent) {
      form.current.reset()
    }
  }, [actionData])
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reestablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {(data?.error || actionData?.sent || actionData?.error) && (
        <Alerta alerta={actionData?.sent ? actionData : data} />
      )}

      {(data?.success || actionData?.sent) && (
        <Form ref={form} method='post' className='my-10 bg-white shadow rounded-lg p-10'>
          {/* Password */}
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
              Nuevo Password
            </label>
            <input
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              type='password'
              id='password'
              name='password'
              placeholder='Escribe tu Nuevo Password'
            />
          </div>

          {/* Submit */}
          <input
            type='submit'
            value='Guardar Nuevo Password'
            className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 mb-5 transition-colors'
          />
        </Form>
      )}

      <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>
        Inicia Sesión
      </Link>
    </>
  )
}
