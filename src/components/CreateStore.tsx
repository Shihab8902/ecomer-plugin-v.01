
import { useContext, useState } from 'react';
import UserAvatar from './UserAvatar'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useStoreInfo from '../hooks/useStoreInfo';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from './LoaderSpinner';
import { framer } from 'framer-plugin';

const CreateStore = () => {

    const navigate = useNavigate();

    const [isStripeChecked, setIsStripeChecked] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isYocoChecked, setIsYocoChecked] = useState(false);
    const [isStoreCreating, setIsStoreCreating] = useState(false);

    const { refetchStore } = useStoreInfo();

    const { user } = useContext(UserContext)
    const axiosPublic = useAxiosPublic();


    //Handle store creation
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsStoreCreating(true)
        const storeName = e.target?.storeName?.value;
        const stripeSecret = e.target?.stripeSecret?.value;
        const yocoSecret = e.target?.yocoSecret?.value;
        const storeData = {
            storeName,
            stripeSecret,
            yocoSecret,
            admin: user.email
        }
        axiosPublic.post("/store", storeData)
            .then(() => {
                refetchStore();
                framer.notify("Store Created!", {
                    durationMs: 3000,
                    variant: "success",
                })
                setIsStoreCreating(false);
                navigate("/")

            }).catch(error => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error",
                })
                setIsStoreCreating(false);
            })

    }


    return <div>
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1">
            <h3 className="text-center font-semibold text-2xl ">Create Store</h3>
            <div>
                <UserAvatar />
            </div>
        </div>

        <form onSubmit={handleFormSubmit} className="my-5 max-w-80 mx-auto border p-5 rounded-lg" >
            <div>
                <label className="block text-sm mb-1 font-medium" htmlFor="name">Store Name</label>
                <input className="w-full p-3 rounded-md  h-10 " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
            </div>

            {/* Choose payment method */}
            <div className='mt-3 rounded-lg'>
                <label className="block text-sm mb-1 font-medium" htmlFor="paymentMethod">Select Payment Method</label>
                <div >
                    <div className='flex items-center justify-between border mt-2  h-8 px-3 border-[#D3D3D4]'>
                        <input checked disabled className='w-5 h-5 cursor-pointer' type="checkbox" name="codCheckbox" id="codCheckbox" />
                        <img className='w-10' src="cod.svg" alt="Cash on Delivery" />
                    </div>
                    <div className='flex items-center justify-between border border-t-0  h-8 px-3 border-[#D3D3D4]'>
                        <input className='w-5 h-5 cursor-pointer' onChange={() => setIsStripeChecked(!isStripeChecked)} type="checkbox" name="stripeCheckbox" id="stripeCheckbox" />
                        <img className='w-10' src="stripe.png" alt="Stripe" />
                    </div>

                    <div className='flex items-center justify-between border border-t-0 h-8  px-3 border-[#D3D3D4]'>
                        <input className='w-5 h-5 cursor-pointer' onChange={() => setIsYocoChecked(!isYocoChecked)} type="checkbox" name="yocoCheckbox" id="yocoCheckbox" />
                        <img className='w-10' src="yoco.svg" alt="YOCO" />
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

            <button type="submit" disabled={isStoreCreating} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                {
                    isStoreCreating ? <><span>Creating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Create"
                }

            </button>

        </form>

        <Toaster />



    </div>
}

export default CreateStore