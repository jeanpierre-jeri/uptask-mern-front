import { Link } from 'react-router-dom'

export default function PreviewProyecto({ proyecto }) {
  const { nombre, _id, cliente } = proyecto
  return (
    <div className='border-b p-5 flex'>
      <p className='flex-1 flex gap-2 items-center'>
        {nombre} <span className='text-sm uppercase text-gray-500 '> {cliente}</span>
      </p>

      <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'>
        Ver Proyecto
      </Link>
    </div>
  )
}
