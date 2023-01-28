import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'

export default function NuevoColaborador() {
  const [loading, setLoading] = useState(false)
  const { colaborador, agregarColaborador } = useProyectos()

  const { nombre, _id } = useLoaderData()

  const handleClick = async () => {
    await agregarColaborador({ projectId: _id })
  }

  return (
    <>
      <h1 className='text-4xl font-black'>Añadir colaborar(a) al Proyecto: {nombre}</h1>

      <div className='mt-10 flex justify-center'>
        <FormularioColaborador setLoading={setLoading} />
      </div>

      {loading && <p className='text-center'>Cargando...</p>}

      {colaborador?._id && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white  py-10 px-5 md:w-1/2 rounded-lg shadow '>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado: </h2>

            <div className='flex justify-between items-center'>
              <p>{colaborador.nombre}</p>

              <button
                onClick={handleClick}
                type='button'
                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
              >
                Agregar al Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
