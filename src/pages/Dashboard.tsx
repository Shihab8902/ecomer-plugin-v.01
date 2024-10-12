import CreateStore from "../components/CreateStore"
import LoaderSpinner from "../components/LoaderSpinner";
import { OrderTable } from "../components/OrderTable";
import useOrderInfo from "../hooks/useOrderInfo";
import useStoreInfo from "../hooks/useStoreInfo"
import useTotalOrders from "../hooks/useTotalOrders";
import Tutorial from "./Tutorial";







const Dashboard = () => {

    const { storeLoading, currentStore } = useStoreInfo();
    const { totalOrders } = useTotalOrders();


    const { ordersLoading } = useOrderInfo({ filter: "All", currentStore: currentStore });

    {/* Conditional render store creation  */ }
    if (!currentStore?.storeId) {
        return <main >

            {
                storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : !currentStore?.storeId && <CreateStore />

            }
        </main>
    }


    // Conditional Render tutorial page
    if (totalOrders?.total <= 0) {
        return <main>
            <Tutorial />
        </main>
    }






    {/* Conditional render order information */ }
    if (currentStore?.storeId) {
        return <main >

            {
                ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : currentStore?.storeId && <OrderTable />
            }
        </main>
    }

    return;

}

export default Dashboard