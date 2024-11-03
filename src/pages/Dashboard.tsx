import LoaderSpinner from "../components/LoaderSpinner";
import useStoreInfo from "../hooks/useStoreInfo";
import useTotalOrders from "../hooks/useTotalOrders";
import { Navigate } from "react-router-dom";
import InitialCreateStore from "./InitialStoreCreate";


const Dashboard = () => {
    const { storeLoading, currentStore } = useStoreInfo();
    const { totalOrders } = useTotalOrders();



    // Conditional render for store creation or redirect
    if (!currentStore?.storeId) {
        return (
            <main>
                {storeLoading ? (
                    <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" />
                ) : (
                    <InitialCreateStore />
                )}
            </main>
        );
    }

    // Redirect to "/orders" if there are orders
    if (totalOrders?.total > 0) {
        return <Navigate to="/orders" />
    }

    // Redirect to home if no specific conditions are met
    return <Navigate to="/" />
};

export default Dashboard;
