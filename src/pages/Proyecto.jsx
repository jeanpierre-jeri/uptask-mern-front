import { useState } from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'
import useAdmin from '../hooks/useAdmin'
import useProyectos from '../hooks/useProyectos'
import { api } from '../utils/api'
import { token } from '../utils/auth'

export async function loader({ params }) {
  const { id } = params

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    }
  }

  try {
    const { data } = await api.get(`/proyectos/${id}`, config)
    return data
  } catch (error) {
    return redirect('/proyectos')
  }
}

export default function Proyecto() {
  const { nombre, _id, tareas = [], colaboradores = [], creador } = useLoaderData()
  const { handleModalTarea, alerta } = useProyectos()
  const [tarea, setTarea] = useState({
    fechaEntrega: '',
    nombre: '',
    descripcion: '',
    prioridad: ''
  })
  const { isAdmin } = useAdmin({ creador })

  const handleNuevaTarea = () => {
    setTarea({ fechaEntrega: '', nombre: '', descripcion: '', prioridad: '' })
    handleModalTarea()
  }

  const handleActualizarTarea = (tarea) => {
    setTarea(tarea)
    handleModalTarea()
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{nombre}</h1>
        {isAdmin && (
          <Link
            to={`/proyectos/editar/${_id}`}
            className='uppercase font-bold flex items-center text-gray-500 hover:text-black transition-colors gap-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            Editar
          </Link>
        )}
      </div>

      {isAdmin && (
        <button
          onClick={handleNuevaTarea}
          type='button'
          className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white flex gap-2 items-center justify-center mt-5'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
            <path
              fillRule='evenodd'
              d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
              clipRule='evenodd'
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

      <div className='flex justify-center mt-4 -mb-10'>
        <div className='w-full md:w-1/2'>{alerta?.msg && <Alerta alerta={alerta} />}</div>
      </div>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {!tareas.length && <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}

        {tareas.map((tarea) => (
          <Tarea key={tarea._id} isAdmin={isAdmin} tarea={tarea} handleActualizarTarea={handleActualizarTarea} />
        ))}
      </div>

      {isAdmin && (
        <>
          <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl'>Colaboradores</p>

            <Link
              to={`/proyectos/nuevo-colaborador/${_id}`}
              className='text-gray-500 uppercase hover:text-black transition-colors font-bold'
            >
              Añadir
            </Link>
          </div>

          <div className='bg-white shadow mt-10 rounded-lg'>
            {!colaboradores.length && <p className='text-center my-5 p-10'>No hay colaboradores en este proyecto</p>}

            {colaboradores.map((colaborador) => (
              <Colaborador key={colaborador._id} colaborador={colaborador} />
            ))}
          </div>
        </>
      )}

      <ModalFormularioTarea
        nombre={tarea.nombre}
        descripcion={tarea.descripcion}
        fechaEntrega={tarea.fechaEntrega.split('T', 1)}
        prioridad={tarea.prioridad}
        id={tarea._id}
      />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
}
