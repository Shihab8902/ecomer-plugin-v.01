import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from '../components/LoaderSpinner';


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user, loading } = useContext(UserContext);


    if (loading) {
        return <LoaderSpinner />
    }


    if (user) {
        return children;
    }



    return <Navigate to="/login"></Navigate>
}

export default PrivateRoute