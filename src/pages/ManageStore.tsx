import { FaCopy, FaEye, FaEyeSlash, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import UserAvatar from "../components/UserAvatar";
import useStoreInfo from "../hooks/useStoreInfo"
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoIosArrowRoundBack, IoIosHome } from "react-icons/io";
import { framer } from "framer-plugin";
import { PiCaretRightBold } from "react-icons/pi";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { IoSettingsSharp } from "react-icons/io5";
import { MdPayments } from "react-icons/md";


const ManageStore = () => {

    const { storeLoading, refetchStore } = useStoreInfo();

    const { currentStore: store } = useStoreInfo();



    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isYocoSecretFieldVisible, setIsYocoSecretFieldVisible] = useState(false);
    const [isStripeSecretFieldVisible, setIsStripeSecretFieldVisible] = useState(false);
    const [isStripeChecked, setIsStripeChecked] = useState(false);
    const [isYocoChecked, setIsYocoChecked] = useState(false);
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

        // const stripeSecret = e.target?.stripeSecret?.value || store?.stripeSecret || e.target?.newStripeSecret?.value
        // const yocoSecret = e.target?.yocoSecret?.value || store?.yocoSecret || e.target?.newYocoSecret?.value

        axiosPublic.put(`/store?id=${store?._id}`, { storeName, location })
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

                    {/* Store location */}
                    <div className='mt-3'>
                        <label className="block text-sm mb-1 font-medium" htmlFor="location">Business Location</label>
                        <Select options={options} className='cursor-pointer rounded-md' defaultValue={location} value={location} onChange={(value) => setLocation(value)} />
                    </div>


                    {/* Store id */}
                    <div className="mt-3">
                        <label className="block text-sm mb-1 font-medium" htmlFor="storeId">Store ID</label>
                        <div className="w-full rounded-md p-3 mb-2 border text-xs flex justify-between items-center border-gray-100 ">
                            {store?.storeId} <span onClick={handleStoreIdCopy} title='Copy Store ID' className='cursor-pointer'><FaCopy /></span>
                        </div>
                    </div>




                    <button type="submit" disabled={isStoreUpdating} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                        {
                            isStoreUpdating ? <><span>Saving</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Save"
                        }
                    </button>

                </form>
        }







        {/* Bottom bar */}
        <nav className="w-full h-14 fixed bottom-0 bg-[#232327] text-white flex flex-col items-center justify-center">
            <ul className="p-1 flex items-center justify-evenly w-full">
                <li><Link className="flex items-center flex-col cursor-pointer" to="/"> <IoIosHome className="text-2xl" /> Home</Link></li>
                <li><Link className="flex items-center flex-col cursor-pointer" to="/store/manage"> <IoSettingsSharp className="text-2xl" /> General</Link></li>
                <li><Link className="flex items-center flex-col cursor-pointer" to="/store/payments"> <MdPayments className="text-2xl" /> Payments</Link></li>

            </ul>

        </nav>








    </main>
}

export default ManageStore





















