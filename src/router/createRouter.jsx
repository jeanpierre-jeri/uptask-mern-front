import { createBrowserRouter } from 'react-router-dom'
import AuthLayout, { loader as authLoader } from '../layouts/AuthLayout'
import Login, { action as loginAction } from '../pages/Login'
import NuevoPassword, { loader as nuevoPassLoader, action as nuevoPassAction } from '../pages/NuevoPassword'
import OlvidePassword, { action as olvideAction } from '../pages/OlvidePassword'
import Registrar, { action as registrarAction } from '../pages/Registrar'
import ConfirmarCuenta, { loader as confirmarLoader } from '../pages/ConfirmarCuenta'
import RutaProtegida, { loader as rutaProtegidaLoader } from '../layouts/RutaProtegida'
import Proyectos, { loader as proyectosLoader } from '../pages/Proyectos'
import NuevoProyecto from '../pages/NuevoProyecto'
import Proyecto, { loader as proyectoLoader } from '../pages/Proyecto'
import EditarProyecto from '../pages/EditarProyecto'
import NuevoColaborador from '../pages/NuevoColaborador'

const router = ({ setUser, setProyectos }) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      loader: authLoader({ setUser }),
      children: [
        {
          index: true,
          element: <Login />,
          action: loginAction
        },
        {
          path: 'registrar',
          element: <Registrar />,
          action: registrarAction
        },
        {
          path: 'olvide-password',
          element: <OlvidePassword />,
          action: olvideAction
        },
        {
          path: 'olvide-password/:token',
          element: <NuevoPassword />,
          loader: nuevoPassLoader,
          action: nuevoPassAction
        },
        {
          path: 'confirmar/:id',
          element: <ConfirmarCuenta />,
          loader: confirmarLoader
        }
      ]
    },
    {
      path: '/proyectos',
      element: <RutaProtegida />,
      loader: rutaProtegidaLoader({ setUser }),
      children: [
        {
          index: true,
          element: <Proyectos />,
          loader: proyectosLoader({ setProyectos })
        },
        {
          path: 'crear-proyecto',
          element: <NuevoProyecto />
        },
        {
          path: 'nuevo-colaborador/:id',
          element: <NuevoColaborador />,
          loader: proyectoLoader
        },
        {
          path: ':id',
          element: <Proyecto />,
          loader: proyectoLoader
        },
        {
          path: 'editar/:id',
          element: <EditarProyecto />,
          loader: proyectoLoader
        }
      ]
    }
  ])
}

export default router
