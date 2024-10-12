import { useEffect } from "react";
import useGetDataPublic from "./useGetPublic";


const useTotalOrders = () => {
    const savedStoreId = localStorage.getItem("currentStore");

    const { data: totalOrders, refetch: refetchTotalOrders } = useGetDataPublic([savedStoreId, "totalOrders"], `/orders/total?id=${savedStoreId}`);

    //Refetch
    useEffect(() => {
        refetchTotalOrders();
    }, [savedStoreId, refetchTotalOrders]);



    return { totalOrders, refetchTotalOrders };

}

export default useTotalOrders