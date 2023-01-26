import { useContext } from 'react'
import ProyectosContext from '../context/proyectos.context'

export default function useProyectos() {
  return useContext(ProyectosContext)
}
