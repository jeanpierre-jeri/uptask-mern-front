import { Form, Link, redirect, useActionData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { api } from '../utils/api'
import { setToken } from '../utils/auth'

export async function action({ request }) {
  const formData = await request.formData()

  const { email, password } = Object.fromEntries(formData)

  if ([email, password].includes('')) {
    return {
      msg: 'Todos los campos son obligatorios',
      error: true
    }
  }

  try {
    const { data } = await api.post('/usuarios/login', { email, password })
    setToken({ token: data?.token })

    return redirect('/proyectos')
  } catch (error) {
    return {
      msg: error.response.data.message,
      error: true
    }
  }
}

export default function Login() {
  const data = useActionData()

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {data?.msg && <Alerta alerta={data} />}

      <Form method='post' className='my-10 bg-white shadow rounded-lg p-10'>
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

        {/* Submit */}
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 mb-5 transition-colors'
        />
      </Form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/registrar'>
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to='/olvide-password'>
          Olvide mi password
        </Link>
      </nav>
    </>
  )
}
