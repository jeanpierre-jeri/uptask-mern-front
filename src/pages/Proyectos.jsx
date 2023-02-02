import { useLoaderData } from 'react-router-dom'
import PreviewProyecto from '../components/PreviewProyecto'
import { api } from '../utils/api'

export function loader({ setProyectos }) {
  return async function () {
    try {
      const { data } = await api.get('/proyectos')
      setProyectos(data)
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export default function Proyectos() {
  const proyectos = useLoaderData()

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      <div className='bg-white  shadow mt-10 rounded-lg'>
        {!proyectos?.length && <p className='text-center  text-gray-600 uppercase p-5'>No hay proyectos aún</p>}

        {proyectos?.map((proyecto) => {
          return <PreviewProyecto proyecto={proyecto} key={proyecto._id} />
        })}
      </div>
    </>
  )
}
