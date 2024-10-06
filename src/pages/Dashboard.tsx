import CreateStore from "../components/CreateStore"
import LoaderSpinner from "../components/LoaderSpinner";
import { OrderTable } from "../components/OrderTable";
import useOrderInfo from "../hooks/useOrderInfo";
import useStoreInfo from "../hooks/useStoreInfo"



const Dashboard = () => {

    const { store, storeLoading } = useStoreInfo();
    const { ordersLoading } = useOrderInfo({ filter: "All" });

    {/* Conditional render store creation  */ }
    if (!store?.storeId) {
        return <main className="px-5">

            {
                storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : !store?.storeId && <CreateStore />

            }
        </main>
    }




    {/* Conditional render order information */ }
    if (store?.storeId) {
        return <main className="px-5">

            {
                ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : store?.storeId && <OrderTable />
            }
        </main>
    }

    return;

}

export default Dashboard