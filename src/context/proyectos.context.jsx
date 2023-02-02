import { createContext, useState } from 'react'
import { api } from '../utils/api'

const ProyectosContext = createContext()

export function ProyectosProvider({ children }) {
  const [alerta, setAlerta] = useState({ msg: '', error: false })
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
  const [idTarea, setIdTarea] = useState(null)
  const [colaborador, setColaborador] = useState({ _id: '', nombre: '', email: '' })
  const [buscador, setBuscador] = useState(false)
  const [proyectos, setProyectos] = useState(['a'])

  // Submit proyecto para crear o actualizar
  const submitProyecto = async ({ id, ...formData }) => {
    if (!id) {
      await nuevoProyecto({ formData })
    } else {
      await actualizarProyecto({ formData, id })
    }
  }

  // Crear Proyecto
  const nuevoProyecto = async ({ formData }) => {
    try {
      await api.post('/proyectos', formData)

      mostrarAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({ msg: error?.response?.data?.message || 'Hubo un error', error: true })
    }
  }

  // Actualizar Proyecto
  const actualizarProyecto = async ({ formData, id }) => {
    try {
      await api.put(`/proyectos/${id}`, formData)

      mostrarAlerta({
        msg: 'Proyecto actualizado correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({ msg: error?.response?.data?.message || 'Hubo un error', error: true })
    }
  }

  // Eliminar Proyecto
  const eliminarProyecto = async (id) => {
    try {
      const { data } = await api.delete(`/proyectos/${id}`)
      mostrarAlerta({
        msg: data.message,
        error: false
      })
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Submit tarea
  const submitTarea = async ({ tarea, tareaId }) => {
    if (!tareaId) {
      await crearTarea({ tarea })
    } else {
      await actualizarTarea({ tarea, tareaId })
    }
  }

  // Crear Tarea
  const crearTarea = async ({ tarea }) => {
    try {
      await api.post('/tareas', tarea)
      mostrarAlerta({
        msg: 'Tarea creada correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Actualizar Tarea
  const actualizarTarea = async ({ tarea, tareaId }) => {
    try {
      await api.put(`/tareas/${tareaId}`, tarea)
      mostrarAlerta({
        msg: 'Tarea actualizada correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Eliminar Tarea
  const eliminarTarea = async () => {
    try {
      const { data } = await api.delete(`/tareas/${idTarea}`)
      mostrarAlerta({
        msg: data.message,
        error: false
      })
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    } finally {
      setModalEliminarTarea(false)
    }
  }

  // Buscar colaborador
  const submitColaborador = async ({ email }) => {
    try {
      const { data } = await api.post('/proyectos/colaboradores', { email })
      setColaborador(data)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Agregar Colaborador
  const agregarColaborador = async ({ projectId }) => {
    try {
      const { data } = await api.post(`/proyectos/colaboradores/${projectId}`, { colaboradorId: colaborador._id })
      mostrarAlerta({
        msg: data.message,
        error: false
      })
      setColaborador({ _id: '', nombre: '', email: '' })
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Eliminar Colaborador
  const eliminarColaborador = async ({ projectId }) => {
    try {
      const { data } = await api.delete(`/proyectos/colaboradores/${projectId}?colaboradorId=${colaborador._id}`)
      mostrarAlerta({
        msg: data.message,
        error: false
      })
      setColaborador({ _id: '', nombre: '', email: '' })
      setModalEliminarColaborador(false)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Completar Tarea
  const completarTarea = async ({ id }) => {
    try {
      await api.post(`/tareas/estado/${id}`)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  // Mostrar y resetear mensaje de alerta
  const mostrarAlerta = ({ msg, error }) => {
    setAlerta({ msg, error })

    setTimeout(() => {
      setAlerta({ msg: '', error: false })
    }, 4000)
  }

  // Toggle modal para editar o crear tareas
  const handleModalTarea = (boolean = true) => {
    setModalFormularioTarea(boolean)
  }

  // Toggle modal para confirmar eliminar una tarea
  const handleModalEliminarTarea = (id = '') => {
    setIdTarea(id)
    setModalEliminarTarea((prevState) => !prevState)
  }

  // Toggle modal confirmar eliminar un colaborador
  const handleModalEliminarColaborador = ({ colaborador = { _id: '', nombre: '', email: '' } }) => {
    setColaborador(colaborador)
    setModalEliminarColaborador((prevState) => !prevState)
  }

  // Toggle modal buscador
  const handleModalBuscador = () => {
    setBuscador((prevState) => !prevState)
  }

  return (
    <ProyectosContext.Provider
      value={{
        alerta,
        colaborador,
        modalEliminarTarea,
        modalFormularioTarea,
        modalEliminarColaborador,
        buscador,
        proyectos,
        agregarColaborador,
        eliminarProyecto,
        eliminarTarea,
        handleModalEliminarTarea,
        handleModalTarea,
        mostrarAlerta,
        submitColaborador,
        submitProyecto,
        submitTarea,
        handleModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleModalBuscador,
        setProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext
