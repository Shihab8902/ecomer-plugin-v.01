import { useContext, useEffect } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";
import useStoreInfo from "./useStoreInfo";


const useOrderInfo = ({ filter }: { filter: string }) => {

    const { store } = useStoreInfo();
    const { user } = useContext(UserContext);

    const { data: orders, refetch: refetchOrders, isLoading: ordersLoading } = useGetDataPublic([user?.email, "orders"], `/orders?storeId=${store?.storeId}&filter=${filter}`);

    useEffect(() => {
        refetchOrders();
    }, [filter, refetchOrders])

    return { orders, refetchOrders, ordersLoading }
}

export default useOrderInfo