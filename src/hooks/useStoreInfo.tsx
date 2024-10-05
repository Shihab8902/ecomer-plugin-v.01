import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import useGetDataPublic from "./useGetPublic";


const useStoreInfo = () => {
    const { user } = useContext(UserContext);
    const { data: store, refetch: refetchStore, isLoading: storeLoading } = useGetDataPublic([user?.email, "store"], `/store?admin=${user?.email}`);
    return { store, refetchStore, storeLoading }
}

export default useStoreInfo