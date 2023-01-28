import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

export default function FormularioColaborador({ setLoading }) {
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email } = Object.fromEntries(new window.FormData(e.target))

    if (!email) {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    e.target.style.pointerEvents = 'none'
    setLoading(true)

    await submitColaborador({ email })

    e.target.style.pointerEvents = 'auto'
    setLoading(false)

    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
      {alerta?.msg && <Alerta alerta={alerta} />}

      {/* Email */}
      <div className='mb-5'>
        <label htmlFor='email' className='text-gray-700 uppercase font-bold text-sm'>
          Email Colaborador
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email de Usuario'
          className='border-2 w-full p-2 mt-2 placeholder:gray-400'
        />
      </div>

      <input
        type='submit'
        value='Buscar Colaborador'
        className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
      />
    </form>
  )
}
