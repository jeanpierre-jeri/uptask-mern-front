import { createContext, useState } from 'react'
import { api } from '../utils/api'
import { token } from '../utils/auth'

const ProyectosContext = createContext()

export function ProyectosProvider({ children }) {
  const [alerta, setAlerta] = useState({ msg: '', error: false })
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [idTarea, setIdTarea] = useState(null)
  const [colaborador, setColaborador] = useState({ _id: '', nombre: '', email: '' })

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
      await api.post('/proyectos', formData, config())

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
      await api.put(`/proyectos/${id}`, formData, config())

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
      const { data } = await api.delete(`/proyectos/${id}`, config())
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
      await api.post('/tareas', tarea, config())
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
      await api.put(`/tareas/${tareaId}`, tarea, config())
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
      const { data } = await api.delete(`/tareas/${idTarea}`, config())
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
      const { data } = await api.post('/proyectos/colaboradores', { email }, config())
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
      const { data } = await api.post(
        `/proyectos/colaboradores/${projectId}`,
        { colaboradorId: colaborador._id },
        config()
      )
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

  // Configuracion para header de autenticacion de axios
  const config = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
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

  return (
    <ProyectosContext.Provider
      value={{
        alerta,
        colaborador,
        modalEliminarTarea,
        modalFormularioTarea,
        agregarColaborador,
        eliminarProyecto,
        eliminarTarea,
        handleModalEliminarTarea,
        handleModalTarea,
        mostrarAlerta,
        submitColaborador,
        submitProyecto,
        submitTarea
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext
