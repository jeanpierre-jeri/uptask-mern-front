import { Link, useNavigate } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import { deleteToken } from '../utils/auth'
import Busqueda from './Busqueda'

export default function Header() {
  const { handleModalBuscador } = useProyectos()
  const navigate = useNavigate()

  const handleClick = () => {
    deleteToken()
    navigate('/')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <Link to='/proyectos'>
          <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>UpTask</h2>
        </Link>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button onClick={handleModalBuscador} type='button' className='font-bold uppercase'>
            Buscar Proyecto
          </button>

          <Link to='/proyectos' className='font-bold uppercase'>
            Proyectos
          </Link>

          <button
            onClick={handleClick}
            type='button'
            className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  )
}
