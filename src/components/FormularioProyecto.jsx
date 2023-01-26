import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useNavigate } from 'react-router-dom'

export default function FormularioProyecto({
  id = '',
  nombre = '',
  descripcion = '',
  fechaEntrega = '',
  cliente = '',
  submitText = 'Crear Proyecto'
}) {
  const { mostrarAlerta, alerta, submitProyecto } = useProyectos()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.style.pointerEvents = 'none'

    const formData = Object.fromEntries(new window.FormData(e.target))

    if (Object.values(formData).includes('')) {
      mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }

    await submitProyecto({ ...formData, id })

    cleanFormInputs(e.target)
    setTimeout(() => {
      if (!id) {
        navigate('/proyectos')
      } else {
        navigate(`/proyectos/${id}`)
      }
      e.target.style.pointerEvents = 'auto'
    }, 3500)
  }

  const cleanFormInputs = (form) => {
    for (const item of form.children) {
      if (!item.children.length) continue

      item.children[1].value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 md:1/2 rounded-lg shadow'>
      {alerta?.msg && <Alerta alerta={alerta} />}
      {/* Nombre */}
      <div className='mb-5'>
        <label htmlFor='nombre' className='text-gray-700 uppercase font-bold text-sm'>
          Nombre Proyecto
        </label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del Proyecto'
          defaultValue={nombre}
        />
      </div>

      {/* Descripcion */}
      <div className='mb-5'>
        <label htmlFor='descripcion' className='text-gray-700 uppercase font-bold text-sm'>
          Descripcion
        </label>
        <textarea
          id='descripcion'
          name='descripcion'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none'
          placeholder='Descripcion del Proyecto'
          defaultValue={descripcion}
        />
      </div>

      {/* Fecha de Entrega */}
      <div className='mb-5'>
        <label htmlFor='fechaEntrega' className='text-gray-700 uppercase font-bold text-sm'>
          Fecha Entrega
        </label>
        <input
          type='date'
          id='fechaEntrega'
          name='fechaEntrega'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none'
          defaultValue={fechaEntrega}
        />
      </div>

      {/* Nombre Cliente */}
      <div className='mb-5'>
        <label htmlFor='cliente' className='text-gray-700 uppercase font-bold text-sm'>
          Nombre Cliente
        </label>
        <input
          type='text'
          id='cliente'
          name='cliente'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del Cliente'
          defaultValue={cliente}
        />
      </div>

      {/* Submit */}
      <input
        type='submit'
        value={submitText}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
      />
    </form>
  )
}
