import { IoIosArrowRoundBack, IoIosHome } from "react-icons/io"
import UserAvatar from "../components/UserAvatar"
import { Link, useNavigate } from "react-router-dom"
import { IoSettingsSharp } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { PiCaretRightBold } from "react-icons/pi";
import { useState } from "react";
import useStoreInfo from "../hooks/useStoreInfo";
import { FaRegCheckCircle } from "react-icons/fa";


const PaymentMethods = () => {

    const navigate = useNavigate();

    const [isCodOpen, setIsCodOpen] = useState(false);
    const [isStripeOpen, setIsStripeOpen] = useState(false);
    const [isYocoOpen, setIsYocoOpen] = useState(false);

    const { currentStore: store } = useStoreInfo();





    return <main className="mb-14">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1 px-5">
            <div className="flex items-center gap-2">
                <span onClick={() => navigate(-1)}><IoIosArrowRoundBack className="text-2xl cursor-pointer" /></span>
                <h3 className="text-center font-semibold text-2xl ">Payment Methods</h3>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>


        {/* Contents */}
        <div className="my-5 max-w-96 mx-auto border p-5 rounded-lg">

            {/* Cash on delivery */}
            <div >
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsCodOpen(!isCodOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isCodOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isCodOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-10 select-none' src="../../public/cod.svg" alt="Cash on Delivery" />
                        </div>
                        {
                            store?.allowCod ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button className=" w-fit h-fit px-3 py-1 rounded-md bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isCodOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-normal">About this payment method</h4>
                            <p className="mt-2 text-xs font-medium leading-4">Cash on Delivery enables us to collect payment from customers at the time of delivery, ensuring a secure transaction without upfront online payments.</p>
                            {
                                store?.allowCod && <div className="w-full flex justify-end mt-5">
                                    <button type="button" className="w-20 rounded-md text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>
                    </div>


                </div>

            </div>


            {/* Stripe */}
            <div className="mt-5">
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsStripeOpen(!isStripeOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isStripeOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isStripeOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-10 select-none' src="../../public/stripe.png" alt="Stripe" />
                        </div>
                        {
                            store?.stripeSecret ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button className=" w-fit h-fit px-3 py-1 rounded-md bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isStripeOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-normal">About this payment method</h4>
                            <p className="mt-2 text-xs font-medium leading-4">Stripe allows us to accept secure online payments, offering customers a seamless checkout experience with support for various payment methods.</p>
                            {
                                store?.stripeSecret && <div className="w-full flex justify-end mt-5">
                                    <button type="button" className="w-20 rounded-md text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>
                    </div>


                </div>

            </div>


            {/* Yoco */}
            <div className="mt-5">
                <div className=' border-y border-[#D3D3D4] border-collapse cursor-pointer'>
                    <div onClick={() => setIsYocoOpen(!isYocoOpen)} className={`flex items-center justify-between  mt-2  h-10 px-3 ${isYocoOpen && "border-b"} border-[#D3D3D4]`}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-sm ${isYocoOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-12 select-none' src="../../public/yoco.svg" alt="Yoco" />
                        </div>
                        {
                            store?.yocoSecret ? <span className="flex items-center gap-1 text-sm text-[#1FAC64]"><FaRegCheckCircle /> <span className="text-xs font-semibold ">Active</span></span>
                                : <button className=" w-fit h-fit px-3 py-1 rounded-md bg-gray-200">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden  ${isYocoOpen ? "h-fit max-w-fit" : "h-0"} `}>
                        <div className="p-3">
                            <h4 className="uppercase text-xs font-normal">About this payment method</h4>
                            <p className="mt-2 text-xs font-medium leading-4">Yoco enables us to securely process card payments, offering a trusted and convenient payment solution specifically designed for customers in South Africa.</p>
                            {
                                store?.yocoSecret && <div className="w-full flex justify-end mt-5">
                                    <button type="button" className="w-20 rounded-md text-white cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>
                    </div>


                </div>

            </div>


        </div>












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

export default PaymentMethods