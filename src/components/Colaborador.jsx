import React from 'react'
import useProyectos from '../hooks/useProyectos'

export default function Colaborador({ colaborador }) {
  const { nombre, email } = colaborador
  const { handleModalEliminarColaborador } = useProyectos()

  const handleDelete = () => {
    handleModalEliminarColaborador({ colaborador })
  }

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p>{nombre}</p>
        <p className='text-sm text-gray-700'>{email}</p>
      </div>

      <div>
        <button
          onClick={handleDelete}
          type='button'
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
