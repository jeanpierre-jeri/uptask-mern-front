import useProyectos from '../hooks/useProyectos'
import { formatDate } from '../utils/date'

export default function Tarea({ tarea, handleActualizarTarea }) {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea
  const { handleModalEliminarTarea } = useProyectos()

  const handleEdit = async () => {
    await handleActualizarTarea(tarea)
  }

  return (
    <div className='border-b p-5 flex justify-between items-center hover:bg-gray-200 transition-colors'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl'>{nombre}</p>
        <p className='text-sm text-gray-500 uppercase'>{descripcion}</p>
        <p className='text-xl first-letter:uppercase'>{formatDate(fechaEntrega)}</p>
        <p className='text-gray-600'>{prioridad}</p>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={handleEdit}
          type='button'
          className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >
          Editar
        </button>
        {estado ? (
          <button type='button' className='bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
            Completa
          </button>
        ) : (
          <button type='button' className='bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
            Incompleta
          </button>
        )}
        <button
          onClick={() => handleModalEliminarTarea(_id)}
          type='button'
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
