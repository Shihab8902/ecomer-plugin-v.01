import CreateStore from "../components/CreateStore"
import LoaderSpinner from "../components/LoaderSpinner";
import { OrderTable } from "../components/OrderTable";
import useOrderInfo from "../hooks/useOrderInfo";
import useStoreInfo from "../hooks/useStoreInfo"



const Dashboard = () => {

    const { store, storeLoading, currentStore } = useStoreInfo();
    const { ordersLoading } = useOrderInfo({ filter: "All", currentStore: currentStore });

    {/* Conditional render store creation  */ }
    if (!store) {
        return <main className="px-5">

            {
                storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : !store && <CreateStore />

            }
        </main>
    }


    {/* Conditional render order information */ }
    if (store) {
        return <main >

            {
                ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : store && <OrderTable />
            }
        </main>
    }

    return;

}

export default Dashboard