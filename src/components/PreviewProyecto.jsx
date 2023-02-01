import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PreviewProyecto({ proyecto }) {
  const { user } = useAuth()
  const { nombre, _id, cliente, creador } = proyecto
  return (
    <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
      <div className='flex items-center gap-2'>
        <p className='flex-1 flex gap-2 items-center'>
          {nombre} <span className='text-sm uppercase text-gray-500 '> {cliente}</span>
        </p>

        {creador !== user._id && (
          <p className='px-2 py-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
        )}
      </div>

      <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'>
        Ver Proyecto
      </Link>
    </div>
  )
}
