import useStoreInfo from "../hooks/useStoreInfo"
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";

import Select from 'react-select'
import countryList from 'react-select-country-list'

import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { MdContentCopy } from "react-icons/md";


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






    return <main className={`mt-[63px] mb-[72px] flex min-h-[77vh] w-full `}>
        {/* Top bar */}
        <TopBar title="Manage store" showIcon={true} alternativeAvatar={false} />


        {/* Manage store form */}
        {
            storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> :
                <div className=" my-2  px-5 w-full">
                    <div className="bg-white w-full py-3 px-4 rounded-md">

                        {/* Store id */}
                        <div className="w-full">
                            <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="storeId">Store ID</label>
                            <div className="w-full flex justify-between items-center text-[#696969] text-xs ">
                                {store?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer ml-2 text-xl text-[#232327] rotate-[180deg]'><MdContentCopy /></span>
                            </div>
                        </div>



                        <form onSubmit={handleFormSubmit} className="mt-3 w-full pb-2" >

                            {/* Store name */}
                            <div className="w-full">
                                <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="name">Store Name</label>
                                <input className="w-full px-3 py-[14px] rounded-md text-[#232327]  bg-[#F6F6F6] text-base placeholder:text-[#696969]  h-12 " type="text" name="storeName" id="storeName" defaultValue={store?.storeName} placeholder="Enter store name" required />
                            </div>

                            {/* Store location */}
                            <div className='mt-2 w-full'>
                                <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="location">Business Location</label>
                                <Select options={options} className='cursor-pointer rounded-md' defaultValue={location} value={location} onChange={(value) => setLocation(value)} />
                            </div>

                            {/* Store currency */}
                            <div className="mt-2 w-full">
                                <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="currency">Store Currency</label>
                                <input className="w-full px-3 py-[14px] rounded-md text-[#232327]  bg-[#F6F6F6] text-base placeholder:text-[#696969]  h-12 " type="text" name="storeCurrency" id="storeCurrency" defaultValue={store?.storeCurrency} placeholder="Enter currency" required />
                            </div>


                            <div className="mt-3 flex gap-2 w-full justify-end">
                                <button type="button" className="w-[90px]  focus:bg-[#E93725]  bg-[#E93725]  h-8 p-2 hover:bg-red-600 text-xs  rounded-md text-white  flex items-center justify-center gap-2 ">
                                    Delete store
                                </button>

                                <button type="submit" disabled={isStoreUpdating} className="w-[90px]  focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327]  h-8 p-2 hover:bg-black text-xs  rounded-md text-white  flex items-center justify-center gap-2 ">
                                    {
                                        isStoreUpdating ? <><span>Updating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Update"
                                    }
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
        }







        {/* Bottom bar */}
        <BottomBar />







    </main>
}

export default ManageStore





















