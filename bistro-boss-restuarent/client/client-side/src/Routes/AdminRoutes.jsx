import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
// import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    //const [user, loading] = useAuth();
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    // const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    // If the user is not admin,they can't access the routes too:
    if (user && isAdmin) {
        return children;
    }
    // return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;