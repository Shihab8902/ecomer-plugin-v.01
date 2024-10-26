import { FaCopy } from "react-icons/fa";
import UserAvatar from "../components/UserAvatar";
import useStoreInfo from "../hooks/useStoreInfo"
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";

import Select from 'react-select'
import countryList from 'react-select-country-list'

import BottomBar from "../components/BottomBar";


const ManageStore = () => {

    const { storeLoading, refetchStore, currentStore: store } = useStoreInfo();


    const [isStoreUpdating, setIsStoreUpdating] = useState(false);
    const [location, setLocation] = useState(store?.location);


    //Set location value
    useEffect(() => {
        setLocation(store?.location);
    }, [store])

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(store?.storeId)
            .then(() => {
                framer.notify("Copied to clipboard!", {
                    durationMs: 3000,
                    variant: "success",
                })
            })
    }



    const handleFormSubmit = e => {
        e.preventDefault();
        setIsStoreUpdating(true)
        const storeName = e.target.storeName.value;
        const storeCurrency = e.target.storeCurrency.value;


        axiosPublic.put(`/store?id=${store?._id}`, { storeName, location, storeCurrency })
            .then(res => {
                if (res.data) {
                    refetchStore();
                    setIsStoreUpdating(false);
                    navigate("/")
                    framer.notify("Store updated successfully", {
                        durationMs: 3000,
                        variant: "success",
                    })

                }
            }).catch(error => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error",
                })
                setIsStoreUpdating(false);
            })
    }


    //Country selection
    const options = useMemo(() => countryList().getData(), [])






    return <main className="mb-14">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1 px-5">
            <div className="flex items-center gap-2">
                <h3 className="text-center font-semibold text-2xl ">Manage Store</h3>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>


        {/* Manage store form */}
        {
            storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> :
                <div>


                    {/* Store id */}
                    <div className="mt-5  max-w-96 mx-auto border p-3 rounded-lg">
                        <label className="block text-sm mb-1 font-medium" htmlFor="storeId">Store ID</label>
                        <div className="w-full rounded-md p-3 mb-2 border text-xs flex justify-between items-center border-gray-100 ">
                            {store?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer'><FaCopy /></span>
                        </div>
                    </div>



                    <form onSubmit={handleFormSubmit} className="my-5 max-w-96 mx-auto border p-5 rounded-lg" >

                        {/* Store name */}
                        <div>
                            <label className="block text-sm mb-1 font-medium" htmlFor="name">Store Name</label>
                            <input className="w-full p-3 rounded-md mb-2  h-10 " type="text" name="storeName" id="storeName" defaultValue={store?.storeName} placeholder="Enter store name" required />
                        </div>

                        {/* Store location */}
                        <div className='mt-3'>
                            <label className="block text-sm mb-1 font-medium" htmlFor="location">Business Location</label>
                            <Select options={options} className='cursor-pointer rounded-md' defaultValue={location} value={location} onChange={(value) => setLocation(value)} />
                        </div>

                        {/* Store name */}
                        <div className="mt-3">
                            <label className="block text-sm mb-1 font-medium" htmlFor="currency">Store Currency</label>
                            <input className="w-full p-3 rounded-md mb-2  h-10 " type="text" name="storeCurrency" id="storeCurrency" defaultValue={store?.storeCurrency} placeholder="Enter store currency" required />
                        </div>


                        <button type="submit" disabled={isStoreUpdating} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                            {
                                isStoreUpdating ? <><span>Saving</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Save"
                            }
                        </button>

                    </form>
                </div>
        }







        {/* Bottom bar */}
        <BottomBar />







    </main>
}

export default ManageStore





















