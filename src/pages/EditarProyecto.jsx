import { useLoaderData } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'

export default function EditarProyecto() {
  const { nombre, cliente, fechaEntrega, descripcion, _id } = useLoaderData()
  return (
    <>
      <h1 className='flex gap-2 text-4xl font-black'>
        EditarProyecto:
        <span>{nombre}</span>
      </h1>

      <div className='mt-10 flex justify-center'>
        <FormularioProyecto
          nombre={nombre}
          cliente={cliente}
          fechaEntrega={fechaEntrega.split('T', 1)}
          descripcion={descripcion}
          submitText='Actualizar Proyecto'
          id={_id}
        />
      </div>
    </>
  )
}
