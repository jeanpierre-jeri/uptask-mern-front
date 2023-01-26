import { useRef, useEffect } from 'react'
import { Form, Link, useActionData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { api } from '../utils/api'

export const action = async ({ request }) => {
  const formData = await request.formData()

  const { nombre, email, password, password2 } = Object.fromEntries(formData)

  if ([nombre, email, password, password2].includes('')) {
    return {
      msg: 'Todos los campos son obligatorios',
      error: true
    }
  }

  if (password !== password2) {
    return {
      msg: 'Los password no son iguales',
      error: true
    }
  }

  if (password.length < 6) {
    return {
      msg: 'El password es muy corto, agrega mínimo 6 caracteres',
      error: true
    }
  }

  // Registro usuario
  try {
    const { data } = await api.post('/usuarios', {
      nombre,
      email,
      password
    })

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

export default function Registrar() {
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
        Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {data?.msg && <Alerta alerta={data} />}

      <Form ref={form} method='post' action='/registrar' className='my-10 bg-white shadow rounded-lg p-10'>
        {/* Nombre */}
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>
            Nombre
          </label>
          <input
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            type='text'
            id='nombre'
            name='nombre'
            placeholder='Tu nombre'
          />
        </div>

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

        {/* Password */}
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
            Password
          </label>
          <input
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            type='password'
            id='password'
            name='password'
            placeholder='Password de Registro'
          />
        </div>

        {/* Repetir Password */}
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password2'>
            Repetir Password
          </label>
          <input
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            type='password'
            id='password2'
            name='password2'
            placeholder='Repetir tu Password'
          />
        </div>

        {/* Submit */}
        <input
          type='submit'
          value='Crear Cuenta'
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 mb-5 transition-colors'
        />
      </Form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/'>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/olvide-password'>
          Olvide mi password
        </Link>
      </nav>
    </>
  )
}
