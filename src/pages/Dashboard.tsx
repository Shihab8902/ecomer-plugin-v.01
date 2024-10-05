import CreateStore from "../components/CreateStore"
import LoaderSpinner from "../components/LoaderSpinner";
import { OrderTable } from "../components/OrderTable";
import useOrderInfo from "../hooks/useOrderInfo";
import useStoreInfo from "../hooks/useStoreInfo"



const Dashboard = () => {

    const { store, storeLoading } = useStoreInfo();
    const { ordersLoading } = useOrderInfo();




    return <main className="px-5">
        {/* Conditional render store creation  */}
        {
            storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : !store?.storeId && <CreateStore />
        }

        {/* Conditional render order information */}
        {
            ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : store?.storeId && <OrderTable />
        }


    </main>
}

export default Dashboard