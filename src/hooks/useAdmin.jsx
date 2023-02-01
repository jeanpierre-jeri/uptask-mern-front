import useAuth from './useAuth'

export default function useAdmin({ creador }) {
  const { user } = useAuth()

  return { isAdmin: creador === user._id }
}
