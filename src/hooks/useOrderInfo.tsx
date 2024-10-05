import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";


const useOrderInfo = () => {

    const { store } = useStoreInfo();
    const { user } = useContext(UserContext);

    const { data: orders, refetch: refetchOrders, isLoading: ordersLoading } = useGetDataPublic([user?.email, "orders"], `/orders?storeId=${store?.storeId}&filter=${"All"}`);
    return { orders, refetchOrders, ordersLoading }
}

export default useOrderInfo