import { useEffect, useRef } from 'react'
import { Form, Link, useActionData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { api } from '../utils/api'

export const action = async ({ request }) => {
  const formData = await request.formData()

  const { email } = Object.fromEntries(formData)

  if (!email || email.length < 6) {
    return {
      msg: 'El Email es obligatorio',
      error: true
    }
  }

  try {
    const { data } = await api.post('/usuarios/olvide-password', { email })

    return {
      msg: data.message,
      sent: true
    }
  } catch (error) {
    return {
      msg: error.response.data?.message,
      error: true
    }
  }
}

export default function OlvidePassword() {
  const form = useRef()
  const data = useActionData()

  useEffect(() => {
    if (data?.sent) {
      form.current.reset()
    }
  }, [data])

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Recupera tu acceso y no pierdas tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {data?.msg && <Alerta alerta={data} />}

      <Form ref={form} method='post' action='/olvide-password' className='my-10 bg-white shadow rounded-lg p-10'>
        {/* Email */}
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>
            Email
          </label>
          <input
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            type='email'
            id='email'
            name='email'
            placeholder='Email de Registro'
          />
        </div>

        {/* Submit */}
        <input
          type='submit'
          value='Enviar Instrucciones'
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 mb-5 transition-colors'
        />
      </Form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/registrar'>
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}
