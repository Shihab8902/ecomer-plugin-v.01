import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import useGetDataPublic from "./useGetPublic";
import { useNavigate } from "react-router-dom";

interface CurrentStoreTypes {
    storeId: string;
    location: object;
    _id: string,
    storeName: string,
    storeCurrency: string
}

const useStoreInfo = () => {
    const [currentStore, setCurrentStore] = useState<CurrentStoreTypes | null>(null);

    const navigate = useNavigate();

    const getSavedStore = (stores: CurrentStoreTypes[]) => {
        const savedStoreId = localStorage.getItem("currentStore");
        if (savedStoreId && stores) {
            const selectedStore =
                stores?.find((store) => store._id === savedStoreId) || stores?.[0];

            setCurrentStore(selectedStore);
            return;
        }

        setCurrentStore(stores?.[0]);
    };

    const selectNewStore = (store: CurrentStoreTypes) => {
        localStorage.setItem("currentStore", store?._id);
        setCurrentStore(store);
        navigate("/orders");
    };

    const { user } = (useContext(UserContext) || {}) as { user?: { email: string } };
    const { data: store, refetch: refetchStore, isLoading: storeLoading } = useGetDataPublic(
        [user?.email ?? "", "store"],
        `/store?admin=${user?.email}`
    );


    useEffect(() => {
        if (store) {
            getSavedStore(store);
        }
    }, [store]);



    return { store, refetchStore, currentStore, selectNewStore, storeLoading };
};

export default useStoreInfo;
