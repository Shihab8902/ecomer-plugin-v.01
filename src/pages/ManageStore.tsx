import { FaCopy, FaEye, FaEyeSlash, FaRegEdit } from "react-icons/fa";
import UserAvatar from "../components/UserAvatar";
import useStoreInfo from "../hooks/useStoreInfo"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoIosArrowRoundBack } from "react-icons/io";
import { framer } from "framer-plugin";


const ManageStore = () => {

    const { store, storeLoading, refetchStore } = useStoreInfo();

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isYocoSecretFieldVisible, setIsYocoSecretFieldVisible] = useState(false);
    const [isStripeSecretFieldVisible, setIsStripeSecretFieldVisible] = useState(false);
    const [isStripeChecked, setIsStripeChecked] = useState(false);
    const [isYocoChecked, setIsYocoChecked] = useState(false);
    const [isStoreUpdating, setIsStoreUpdating] = useState(false);

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

    //Format secret
    const formatSecret = (secret: string) => {
        if (!secret) return '';
        const length = secret.length;
        const lastFour = secret.slice(-4);
        const maskedPart = '*'.repeat(length - 4);
        return maskedPart + lastFour;
    };



    const handleFormSubmit = e => {
        e.preventDefault();
        setIsStoreUpdating(true)
        const storeName = e.target.storeName.value;
        const stripeSecret = e.target?.stripeSecret?.value || store?.stripeSecret || e.target?.newStripeSecret?.value
        const yocoSecret = e.target?.yocoSecret?.value || store?.yocoSecret || e.target?.newYocoSecret?.value

        axiosPublic.put(`/store?id=${store?._id}`, { storeName, stripeSecret, yocoSecret })
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



    return <main className="mx-5">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1">
            <div className="flex items-center gap-2">
                <span onClick={() => navigate(-1)}><IoIosArrowRoundBack className="text-2xl cursor-pointer" /></span>
                <h3 className="text-center font-semibold text-2xl ">Manage Store</h3>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>


        {/* Manage store form */}
        {
            storeLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> :
                <form onSubmit={handleFormSubmit} className="my-5 max-w-96 mx-auto border p-5 rounded-lg" >

                    {/* Store name */}
                    <div>
                        <label className="block text-sm mb-1 font-medium" htmlFor="name">Store Name</label>
                        <input className="w-full p-3 rounded-md mb-2  h-10 " type="text" name="storeName" id="storeName" defaultValue={store?.storeName} placeholder="Enter store name" required />
                    </div>


                    {/* Store id */}
                    <div>
                        <label className="block text-sm mb-1 font-medium" htmlFor="storeId">Store ID</label>
                        <div className="w-full rounded-md p-3 mb-2 border text-xs flex justify-between items-center border-gray-100 ">
                            {store?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer'><FaCopy /></span>
                        </div>
                    </div>

                    {/* Render new payment method integration */}
                    <div className='mt-3 rounded-lg'>
                        <label className="block text-sm mb-1 font-medium" htmlFor="paymentMethod">Select Payment Method</label>
                        <div >
                            <div className='flex items-center justify-between border mt-2  h-8 px-3 border-[#D3D3D4]'>
                                <input checked disabled className='w-5 h-5 cursor-pointer' type="checkbox" name="codCheckbox" id="codCheckbox" />
                                <img className='w-10' src="../../public/cod.svg" alt="Cash on Delivery" />
                            </div>

                            <div className='flex items-center justify-between border border-t-0  h-8 px-3 border-[#D3D3D4]'>
                                <input className='w-5 h-5 cursor-pointer' disabled={store?.stripeSecret} checked={store?.stripeSecret} onChange={() => setIsStripeChecked(!isStripeChecked)} type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                                <img className='w-10' src="../../public/stripe.png" alt="Stripe" />
                            </div>

                            <div className='flex items-center justify-between border border-t-0 h-8  px-3 border-[#D3D3D4]'>
                                <input disabled={store?.yocoSecret} checked={store?.yocoSecret} className='w-5 h-5 cursor-pointer' onChange={() => setIsYocoChecked(!isYocoChecked)} type="checkbox" name="yocoCheckbox" id="yocoCheckbox" />
                                <img className='w-10' src="../../public/yoco.svg" alt="YOCO" />
                            </div>
                        </div>
                    </div>



                    {/* Render stripe secret field */}
                    {
                        isStripeChecked && <>
                            <div className="relative mt-3">
                                <label className="block text-sm mb-1 font-medium" htmlFor="stripeSecret">Stripe Secret Key</label>
                                <input className="w-full p-3 rounded-md  h-10" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" required />
                                <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                            </div>
                            <p className=" mt-1 text-[#232327]  text-[9px]">For retrieving your Stripe Secret, visit the <Link className="font-bold hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>
                        </>
                    }



                    {/* Render yoco secret field */}
                    {
                        isYocoChecked && <>
                            <div className="relative mt-3">
                                <label className="block text-sm mb-1 font-medium" htmlFor="yocoSecret">YOCO Secret Key</label>
                                <input className="w-full p-3 rounded-md  h-10" type={visiblePassword ? "text" : "password"} name="yocoSecret" id="yocoSecret" placeholder="Enter YOCO secret" required />
                                <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                            </div>
                            <p className=" mt-1 text-[#232327] text-[9px]">For retrieving your YOCO Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>
                        </>
                    }


                    {/* Render Stripe credentials */}
                    {
                        store?.stripeSecret && <>
                            {/* Stripe Secret */}
                            <div className="mt-3">
                                <label className="block text-sm mb-1 font-medium" htmlFor="storeName">Stripe Secret</label>
                                <div className="w-full p-3 border flex justify-between  border-gray-100 ">
                                    <p className='w-full overflow-x-auto break-words text-xs pr-2'>{formatSecret(store?.stripeSecret)}</p> <span title='Update Stripe Secret' onClick={() => setIsStripeSecretFieldVisible(!isStripeSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-base' /></span>
                                </div>
                            </div>

                            {/* Stripe Secret field */}
                            {
                                isStripeSecretFieldVisible && <div className="relative mt-3">
                                    <label className="block text-sm mb-1 font-medium" htmlFor="stripeSecret">Stripe Secret Key</label>
                                    <input className="w-full p-3 rounded-md  h-10" type={visiblePassword ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" required />
                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>

                            }
                        </>
                    }


                    {/* Render YOCO credentials */}
                    {
                        store?.yocoSecret && <>
                            {/* YOCO Secret */}
                            <div className="mt-3">
                                <label className="block text-sm mb-1 font-medium" htmlFor="yocoSecret">YOCO Secret</label>
                                <div className="w-full p-3 border flex justify-between  border-gray-100 ">
                                    <p className='w-full overflow-x-auto break-words text-xs pr-2'>{formatSecret(store?.yocoSecret)}</p> <span title='Update YOCO Secret' onClick={() => setIsYocoSecretFieldVisible(!isYocoSecretFieldVisible)} className='cursor-pointer'><FaRegEdit className='text-base' /></span>
                                </div>
                            </div>

                            {/* YOCO Secret field */}
                            {
                                isYocoSecretFieldVisible && <div className="relative mt-2">
                                    <label className="block text-sm mb-1 font-medium" htmlFor="yocoSecret">YOCO Secret Key</label>
                                    <input className="w-full p-3 rounded-md  h-10" type={visiblePassword ? "text" : "password"} name="yocoSecret" id="yocoSecret" placeholder="Enter YOCO secret" required />
                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-2 text-base text-gray-400 cursor-pointer">{visiblePassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            }
                        </>
                    }


                    <button type="submit" disabled={isStoreUpdating} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                        {
                            isStoreUpdating ? <><span>Updating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Update"
                        }
                    </button>

                </form>
        }








        <Toaster />
    </main>
}

export default ManageStore