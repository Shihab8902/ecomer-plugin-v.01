import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";
import useGetDataPublic from "./useGetPublic";

const useOrderInfo = ({ filter, currentStore }: { filter?: string; currentStore?: { storeId: string } } = {}) => {
    const { user } = useContext(UserContext);

    const { data: orders, refetch: refetchOrders, isLoading: ordersLoading } = useGetDataPublic(
        [user?.email, "orders"],
        `/orders?storeId=${currentStore?.storeId ?? ''}&filter=${filter ?? ''}`
    );

    useEffect(() => {
        refetchOrders();
    }, [filter, refetchOrders]);

    return { orders, refetchOrders, ordersLoading };
};


export default useOrderInfo;
