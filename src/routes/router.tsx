import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../hooks/PrivateRoute";
import ManageStore from "../pages/ManageStore";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/dashboard",
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            },
            {
                path: "/store/manage",
                element: <PrivateRoute>
                    <ManageStore />
                </PrivateRoute>
            }
        ]
    }
])