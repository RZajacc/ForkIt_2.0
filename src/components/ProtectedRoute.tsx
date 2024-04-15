import { useContext, ReactNode } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

type ProtectedRouteProps = {
  children: ReactNode,
}

function ProtectedRoute(props: ProtectedRouteProps) {

  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? <LoadingPage /> : user ? props.children : <Navigate to="/account" />}
    </>
  )
}

export default ProtectedRoute