import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from '../components/LoaderSpinner';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const authContext = useContext(UserContext);

    // Check if the context is null
    if (!authContext) {
        return <Navigate to="/login" />;
    }

    const { user, loading } = authContext;

    if (loading) {
        return <LoaderSpinner shapeWidth="40" shapeHeight="40" shapeColor="#6E717D" />;
    }

    if (user) {
        return <>{children}</>;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
