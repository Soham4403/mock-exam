import { useEffect } from 'react'
import { setRoute } from '../utils'

function ProtectedRoute({ isLoggedIn, children }) {
  useEffect(() => {
    if (!isLoggedIn) setRoute('login')
  }, [isLoggedIn])

  if (!isLoggedIn) return null
  return children
}

export default ProtectedRoute
