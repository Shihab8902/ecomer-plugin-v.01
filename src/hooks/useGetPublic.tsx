import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useGetDataPublic = (queryKey: string[], url: string) => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const res = await axiosPublic.get(url);
            return res.data;
        }
    });


    return {
        data,
        isLoading,
        error,
        refetch
    };
};

export default useGetDataPublic;