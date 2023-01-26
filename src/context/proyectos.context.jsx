import { createContext, useState } from 'react'
import { api } from '../utils/api'
import { token } from '../utils/auth'

const ProyectosContext = createContext()

export function ProyectosProvider({ children }) {
  const [alerta, setAlerta] = useState({ msg: '', error: false })

  const submitProyecto = async ({ id, ...formData }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    }

    if (!id) {
      await nuevoProyecto({ formData, config })
    } else {
      await actualizarProyecto({ formData, id, config })
    }
  }

  const nuevoProyecto = async ({ formData, config }) => {
    try {
      await api.post('/proyectos', formData, config)

      mostrarAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({ msg: error?.response?.data?.message || 'Hubo un error', error: true })
    }
  }

  const actualizarProyecto = async ({ formData, id, config }) => {
    try {
      await api.put(`/proyectos/${id}`, formData, config)

      mostrarAlerta({
        msg: 'Proyecto actualizado correctamente',
        error: false
      })
    } catch (error) {
      mostrarAlerta({ msg: error?.response?.data?.message || 'Hubo un error', error: true })
    }
  }

  const mostrarAlerta = ({ msg, error }) => {
    setAlerta({ msg, error })

    setTimeout(() => {
      setAlerta({ msg: '', error: false })
    }, 4000)
  }

  return (
    <ProyectosContext.Provider value={{ alerta, mostrarAlerta, submitProyecto }}>{children}</ProyectosContext.Provider>
  )
}

export default ProyectosContext
