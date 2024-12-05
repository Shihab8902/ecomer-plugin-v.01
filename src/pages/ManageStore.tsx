import useStoreInfo from "../hooks/useStoreInfo"
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";

import Select from 'react-select'
import countryList from 'react-select-country-list'

import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";





const ManageStore = () => {


    const { storeLoading, refetchStore, currentStore: store, selectNewStore, store: stores } = useStoreInfo()


    const [isStoreUpdating, setIsStoreUpdating] = useState(false);

    const [location, setLocation] = useState<object | undefined | null>(store?.location);


    //Set location value
    useEffect(() => {
        setLocation(store?.location);
    }, [store])

    // Dismiss all toasts on navigation
    useEffect(() => {
        toast.dismiss();
    }, [location]);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    //Handle Store Id copy
    const handleStoreIdCopy = () => {
        navigator.clipboard.writeText(store?.storeId || '')
            .then(() => {
                framer.notify("Copied to clipboard!", {
                    durationMs: 3000,
                    variant: "success",
                })
            })
    }


    //Handle store update
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsStoreUpdating(true)
        const form = e.currentTarget;
        const storeName = (form.elements.namedItem("storeName") as HTMLInputElement).value;
        const storeCurrency = (form.elements.namedItem("storeCurrency") as HTMLInputElement).value;


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


    //Handle store delete
    const handleStoreDelete = () => {
        toast((t) => (
            <div className="w-full block">
                <h5 className="text-[#232327] font-medium text-base text-center">Delete Store?</h5>
                <p className="text-center mt-2 text-xs text-[#696969]"><span>Are you sure you want to delete this store? This action is irreversible and will permanently delete all store data, including orders.</span> <br /> Type <strong className="text-[#232327] leading-[160%]">{store?.storeName}</strong> below to confirm.</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const value = (form.elements.namedItem("confirmationField") as HTMLInputElement).value;
                    if (value === store?.storeName) {
                        axiosPublic.delete(`/store?storeId=${store?.storeId}`)
                            .then(res => {
                                if (res.data === "success") {
                                    framer.notify("The store has been successfully deleted.", { variant: "success", durationMs: 3000 })
                                    selectNewStore(store && stores[0]);
                                    toast.dismiss(t.id)
                                }
                            })
                            .catch(error => framer.notify(error.message, { variant: "error", durationMs: 3000 }))
                    } else {
                        framer.notify("Store name is incorrect!", { variant: "error", durationMs: 10000 });
                    }

                }} className="flex flex-col justify-center gap-2 items-center mt-2">
                    <input type="text" className="w-full h-8 focus:ring-0  rounded-[4px] text-[#232327]  bg-[#F6F6F6] text-base placeholder:text-[#696969]" autoFocus name="confirmationField" />
                    <div className="flex w-full justify-end gap-3">
                        <button
                            className="w-fit h-fit px-3 py-[6px] text-xs font-medium rounded-[4px] text-white leading-[18px] focus:bg-[#E93725]  bg-[#E93725]  hover:bg-red-600">Confirm</button>
                        <button type="button" onClick={() => toast.dismiss(t.id)} className="w-fit h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-[6px] leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Cancel</button>
                    </div>
                </form>
            </div>
        ), { position: "top-center", duration: 3000 })

    }


    //Country selection
    const options = useMemo(() => countryList().getData(), [])






    return <main className={`mt-[63px] mb-[72px] flex min-h-[77vh] w-full `}>
        {/* Top bar */}
        <TopBar title="Manage store" showIcon={true} />


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
                                <input className="w-full input-field placeholder:font-light caret-black focus:ring-0  px-3 py-[14px] rounded-md text-[#232327]  bg-[#F6F6F6] text-base placeholder:text-[#696969]  h-12 " type="text" name="storeName" id="storeName" defaultValue={store?.storeName} placeholder="Enter store name" required />
                            </div>

                            {/* Store location */}
                            <div className='mt-2 w-full'>
                                <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="location">Business Location</label>
                                <Select options={options} className='cursor-pointer focus:ring-0 input-field placeholder:font-light  rounded-md' defaultValue={location} value={location} onChange={(value) => setLocation(value)} />
                            </div>

                            {/* Store currency */}
                            <div className="mt-2 w-full">
                                <label className="block mb-1 text-base text-[#232327] font-medium" htmlFor="currency">Store Currency</label>
                                <input className="w-full px-3 input-field caret-black placeholder:font-light focus:ring-0  py-[14px] rounded-md text-[#232327]  bg-[#F6F6F6] text-base placeholder:text-[#696969]  h-12 " type="text" name="storeCurrency" id="storeCurrency" defaultValue={store?.storeCurrency} placeholder="Enter currency" required />
                            </div>


                            <div className="mt-3 flex gap-2 w-full justify-end">
                                <button type="button" onClick={handleStoreDelete} className="w-[90px]  focus:bg-[#E93725]  bg-[#E93725]  h-8 p-2 hover:bg-red-600 text-xs  rounded-md text-white  flex items-center justify-center gap-2 ">
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





















