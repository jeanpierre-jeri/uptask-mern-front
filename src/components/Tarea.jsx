import { useNavigate, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import { formatDate } from '../utils/date'

export default function Tarea({ tarea, handleActualizarTarea, isAdmin }) {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id, completado } = tarea
  const { handleModalEliminarTarea, completarTarea } = useProyectos()
  const navigate = useNavigate()
  const params = useParams()

  const handleEdit = async () => {
    await handleActualizarTarea(tarea)
  }

  const handleClick = async (e) => {
    const style = e.target.style
    style.pointerEvents = 'none'
    document.body.style.cursor = 'progress'
    await completarTarea({ id: _id })
    navigate(`/proyectos/${params.id}`)
    style.pointerEvents = 'auto'
    document.body.style.cursor = 'default'
  }

  return (
    <div className='border-b p-5 flex justify-between items-center hover:bg-gray-200 transition-colors gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl'>{nombre}</p>
        <p className='text-sm text-gray-500 uppercase'>{descripcion}</p>
        <p className='text-xl first-letter:uppercase'>{formatDate(fechaEntrega)}</p>
        <p className='text-gray-600'>{prioridad}</p>
        {estado && (
          <p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white w-fit'>
            Completado por: {completado.nombre}
          </p>
        )}
      </div>
      <div className='flex flex-col lg:flex-row gap-2'>
        {isAdmin && (
          <button
            onClick={handleEdit}
            type='button'
            className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          >
            Editar
          </button>
        )}

        <button
          onClick={handleClick}
          type='button'
          className={`${
            estado ? 'bg-sky-600' : 'bg-gray-600'
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {estado ? 'Completa' : 'Incompleta'}
        </button>

        {isAdmin && (
          <button
            onClick={() => handleModalEliminarTarea(_id)}
            type='button'
            className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}
