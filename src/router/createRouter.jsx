import { createBrowserRouter } from 'react-router-dom'
import AuthLayout, { loader as authLoader } from '../layouts/AuthLayout'
import Login, { action as loginAction } from '../pages/Login'
import NuevoPassword, { loader as nuevoPassLoader, action as nuevoPassAction } from '../pages/NuevoPassword'
import OlvidePassword, { action as olvideAction } from '../pages/OlvidePassword'
import Registrar, { action as registrarAction } from '../pages/Registrar'
import ConfirmarCuenta, { loader as confirmarLoader } from '../pages/ConfirmarCuenta'
import RutaProtegida, { loader as rutaProtegidaLoader } from '../layouts/RutaProtegida'

const router = ({ setUser }) => {
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
      loader: rutaProtegidaLoader({ setUser })
    }
  ])
}

export default router