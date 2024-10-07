import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../hooks/PrivateRoute";
import ManageStore from "../pages/ManageStore";
import OrderDetails from "../pages/OrderDetails";
import ManageOrder from "../pages/ManageOrder";
import CreateStore from "../components/CreateStore";
import PaymentMethods from "../pages/PaymentMethods";

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
            },
            {
                path: "/order/details",
                element: <PrivateRoute>
                    <OrderDetails />
                </PrivateRoute>
            },
            {
                path: "/order/manage",
                element: <PrivateRoute>
                    <ManageOrder />
                </PrivateRoute>
            },
            {
                path: "/store/create",
                element: <PrivateRoute>
                    <CreateStore />
                </PrivateRoute>
            },
            {
                path: "/store/payments",
                element: <PrivateRoute>
                    <PaymentMethods />
                </PrivateRoute>
            }


        ]
    }
])