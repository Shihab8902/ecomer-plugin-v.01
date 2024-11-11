import { Link } from "react-router-dom"
import { PiCaretRightBold } from "react-icons/pi";
import { useState } from "react";
import useStoreInfo from "../hooks/useStoreInfo";
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";
import toast from "react-hot-toast";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { MdEmail, MdOutlineModeEditOutline } from "react-icons/md";


const PaymentMethods = () => {



    const [isCodOpen, setIsCodOpen] = useState(false);
    const [isStripeOpen, setIsStripeOpen] = useState(false);
    const [isYocoOpen, setIsYocoOpen] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [yocoPasswordVisible, setYocoPasswordVisible] = useState(false);
    const [stripeSecret, setStripeSecret] = useState('');
    const [yocoSecret, setYocoSecret] = useState('');
    const [isStripeSecretFieldVisible, setIsStripeSecretFieldVisible] = useState(false);
    const [isYocoSecretFieldVisible, setIsYocoSecretFieldVisible] = useState(false);


    const axiosPublic = useAxiosPublic();

    const { currentStore: store, refetchStore } = useStoreInfo();


    //Success message on payment method deactivation
    const successMessage = () => {
        return framer.notify("The payment method has been successfully deactivated.", {
            durationMs: 3000,
            variant: "success"
        });
    }

    //Success message on payment method deactivation
    const successActivationMethod = () => {
        return framer.notify("The payment method has been successfully activated.", {
            durationMs: 3000,
            variant: "success"
        });
    }


    //Error message on payment method deactivation
    const errorMessage = (message: string) => {
        return framer.notify(message, {
            durationMs: 3000,
            variant: "error"
        });
    }


    //Handle payment method deactivation
    const handlePaymentMethodDeactivation = (method: string) => {
        switch (method) {
            case "cod": {
                toast((t) => (

                    <span>
                        <span className="text-center font-semibold w-ull block">Are you sure you want to deactivate the payment method? Related services will stop functioning.</span>
                        <button className="bg-[#E93725] text-white mt-3 h-fit  w-full rounded-[4px] text-sm font-medium px-3 py-[6px] hover:bg-[#c82a1c]" onClick={() => {
                            axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                                .then(result => {
                                    if (result.data === "success") {
                                        toast.dismiss(t.id);
                                        successMessage();
                                        setIsCodOpen(false);
                                        refetchStore();
                                        return;
                                    }

                                })
                                .catch(error => {
                                    errorMessage(error.message);
                                })

                        }}>
                            Confirm
                        </button>
                    </span>

                ), { position: "top-center" });

            }
                break;

            case "stripe": {
                toast((t) => (

                    <span>
                        <span className="text-center font-semibold w-ull block">Are you sure you want to deactivate the payment method? Related services will stop functioning.</span>
                        <button className="bg-[#E93725] text-white mt-3 h-fit  w-full rounded-[4px] text-sm font-medium px-3 py-[6px] hover:bg-[#c82a1c]" onClick={() => {
                            axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                                .then(result => {
                                    if (result.data === "success") {
                                        toast.dismiss(t.id);
                                        successMessage();
                                        refetchStore();
                                        setIsStripeOpen(false);
                                        return;
                                    }

                                })
                                .catch(error => {
                                    errorMessage(error.message);
                                })

                        }}>
                            Confirm
                        </button>
                    </span>

                ), { position: "top-center" });
            }

                break;

            case "yoco": {
                toast((t) => (

                    <span>
                        <span className="text-center font-semibold w-ull block">Are you sure you want to deactivate the payment method? Related services will stop functioning.</span>
                        <button className="bg-[#E93725] text-white mt-3 h-fit  w-full rounded-[4px] text-sm font-medium px-3 py-[6px] hover:bg-[#c82a1c]" onClick={() => {
                            axiosPublic.put(`/payment/deactivate?id=${store?._id}&method=${method}`)
                                .then(result => {
                                    if (result.data === "success") {
                                        toast.dismiss(t.id);
                                        successMessage();
                                        refetchStore();
                                        setIsYocoOpen(false);
                                        return;
                                    }

                                })
                                .catch(error => {
                                    errorMessage(error.message);
                                })

                        }}>
                            Confirm
                        </button>
                    </span>

                ), { position: "top-center" });
            }

                break;
            default: framer.notify("Invalid operation!", {
                durationMs: 3000,
                variant: "error"
            })
        }
    }



    //Handle payment method activation
    const handlePaymentMethodActivation = (method: string) => {
        switch (method) {
            case "cod": {
                axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`)
                    .then(result => {
                        if (result.data === "success") {
                            successActivationMethod();
                            refetchStore();
                            setIsCodOpen(false);
                            return;
                        }

                    })
                    .catch(error => {
                        errorMessage(error.message);
                    })

            }
                break;

            case "stripe": {
                if (stripeSecret) {
                    axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`, { stripeSecret })
                        .then(result => {
                            if (result.data === "success") {
                                successActivationMethod();
                                refetchStore();
                                setIsStripeOpen(false);
                                setIsStripeSecretFieldVisible(false);
                                setStripeSecret('');
                                return;
                            }

                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                } else {
                    framer.notify("Invalid Stripe Secret!", {
                        durationMs: 3000,
                        variant: "error"
                    });
                }
            }

                break;

            case "yoco": {
                if (yocoSecret) {
                    axiosPublic.put(`/payment/activate?id=${store?._id}&method=${method}`, { yocoSecret })
                        .then(result => {
                            if (result.data === "success") {
                                successActivationMethod();
                                refetchStore();
                                setIsYocoOpen(false);
                                setIsYocoSecretFieldVisible(false);
                                setYocoSecret('');
                                return;
                            }

                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                } else {
                    framer.notify("Invalid YOCO Secret!", {
                        durationMs: 3000,
                        variant: "error"
                    });
                }
            }


                break;
            default: framer.notify("Invalid operation!", {
                durationMs: 3000,
                variant: "error"
            })
        }
    }


    //Format secret
    const formatSecret = (secret: string) => {
        if (!secret) return '';
        const length = secret.length;
        if (length > 4) {
            const lastFour = secret.slice(-4);
            const maskedPart = '*'.repeat(length - 4);
            return maskedPart + lastFour;
        }
        return secret;
    };




    return <main className={`mt-[56px] mb-[72px]  min-h-[77vh] w-full  `}>
        {/* Top bar */}
        <TopBar title="Payment Methods" showIcon={false} />


        {/* Contents */}
        <div className=" w-full  p-5 rounded-lg">

            {/* Cash on delivery */}
            <div >
                <div className='bg-white cursor-pointer p-4 rounded-[4px]'>
                    <div onClick={() => setIsCodOpen(!isCodOpen)} className={`flex items-center justify-between  `}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-base text-[#23232780] ${isCodOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <p className="text-[#232327] text-base font-medium">Cash on delivery</p>
                        </div>
                        {
                            store?.allowCod ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                : <button onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaymentMethodActivation("cod");
                                }} className=" w-fit h-fit px-3 py-[6px] text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden transition-all duration-300 ${isCodOpen ? "max-h-96" : "max-h-0"} `}>
                        <div >
                            <p className="mt-2 text-sm font-normal text-[#696969] leading-[20px]">Cash on Delivery enables us to collect payment from customers at the time of delivery, ensuring a secure transaction without upfront online payments.</p>
                            {
                                store?.allowCod && <div className="w-full flex justify-end mt-2">
                                    <button onClick={() => handlePaymentMethodDeactivation("cod")} type="button" className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-[6px] leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                </div>
                            }
                        </div>
                    </div>


                </div>
            </div>


            {/* Stripe */}
            <div className="mt-2">
                <div className=' bg-white cursor-pointer p-4 rounded-[4px]'>
                    <div onClick={() => {
                        setIsStripeOpen(!isStripeOpen);
                        setIsStripeSecretFieldVisible(false);
                    }} className={`flex items-center justify-between `}>
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-base text-[#23232780] ${isStripeOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-[43px] h-[18px] select-none' src="../../public/Stripe.svg" alt="Stripe" />
                        </div>
                        {
                            store?.stripeSecret ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                : <button className=" w-fit h-fit px-3 py-[6px] text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]">Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden transition-all duration-300  ${isStripeOpen ? "max-h-[500px]" : "max-h-0"} `}>
                        <div >
                            <p className="mt-2 text-sm font-normal text-[#696969] leading-[20px]">Stripe allows to accept secure online payments, offering customers a seamless checkout experience with support for various payment methods.</p>

                            {/* Render Editable Stripe secret */}
                            {
                                store?.stripeSecret && <>
                                    {/* Stripe Secret */}
                                    <div className="mt-2">

                                        <div className="w-full">
                                            {
                                                isStripeSecretFieldVisible ? <div className="w-full ">
                                                    {/* Render editable stripe secret field */}
                                                    <div >
                                                        <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="storeName">New Stripe secret key</label>
                                                        <div className="relative">
                                                            <input onChange={(e) => setStripeSecret(e.target.value)} className="w-full h-[45px] input-field placeholder:font-light  p-3 bg-[#F6F6F6] rounded-[4px] " type={visiblePassword ? " text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter new Stripe secret key" />
                                                            <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                                        </div>
                                                        <div className="w-full flex gap-2 justify-end items-center mt-3">
                                                            <button type="button" onClick={() => handlePaymentMethodDeactivation("stripe")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-[6px] leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                                            <button onClick={() => handlePaymentMethodActivation("stripe")} className="w-fit h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-[6px] leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                    : <div className="w-full">
                                                        <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="storeName">Stripe secret key</label>
                                                        <div className="w-full flex items-start justify-between">
                                                            <p className="w-[85%] text-sm text-[#696969] leading-[140%]">{formatSecret(store?.stripeSecret)}</p>
                                                            <span onClick={() => setIsStripeSecretFieldVisible(!isStripeSecretFieldVisible)} className="text-2xl text-[#232327] block cursor-pointer"><MdOutlineModeEditOutline /></span>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>


                                </>
                            }


                            {
                                store?.stripeSecret && <div className={`w-full flex justify-end mt-3 ${isStripeSecretFieldVisible && "hidden"}`}>
                                    {!isStripeSecretFieldVisible && <button type="button" onClick={() => handlePaymentMethodDeactivation("stripe")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-[6px] leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>}
                                </div>
                            }
                        </div>

                        {/* Input Stripe Credentials */}
                        {
                            !store?.stripeSecret && <div className="mt-2">
                                {/* Render stripe secret field */}
                                <div className="relative">
                                    <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="stripeSecret">Stripe secret key</label>
                                    <input onChange={(e) => setStripeSecret(e.target.value)} className="w-full h-[45px] input-field placeholder:font-light  p-3 bg-[#F6F6F6] rounded-[4px] " type={visiblePassword ? " text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret key" />
                                    <span onClick={() => setVisiblePassword(!visiblePassword)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                </div>
                                <p className="font-normal mt-[2px] leading-[140%] text-xs text-[#696969]">For retrieving your Stripe Secret, visit <Link className="font-medium text-[#232327] hover:underline" to="https://docs.stripe.com/keys" target='_blank'>Stripe API documentation.</Link></p>
                                <div className="w-full flex  justify-end">
                                    <button onClick={() => handlePaymentMethodActivation("stripe")} className="w-fit mt-2 h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-[6px] leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                </div>
                            </div>
                        }

                    </div>


                </div>

            </div>


            {/* Yoco */}
            <div className="mt-2">
                <div className='bg-white cursor-pointer p-4 rounded-[4px]'>
                    <div onClick={() => {
                        setIsYocoOpen(!isYocoOpen);
                        setIsYocoSecretFieldVisible(false);
                    }} className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <PiCaretRightBold className={`text-base text-[#23232780] ${isYocoOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`} />
                            <img className='w-[53px] h-[18px] select-none' src="../../public/yoco.svg" alt="Yoco" />
                        </div>
                        {
                            store?.yocoSecret ? <span className="flex items-center gap-1 text-sm text-[#38B819]"><FaRegCheckCircle /> <span className="text-xs font-medium ">Active</span></span>
                                : <button className={`w-fit h-fit px-3 py-[6px] text-xs font-medium rounded-[4px] text-white leading-[18px] hover:bg-black bg-[#232327] focus:bg-[#232327]`}>Turn on</button>
                        }
                    </div>

                    <div className={`w-full overflow-hidden transition-all duration-300  ${isYocoOpen ? "max-h-[500px]" : "max-h-0"} `}>
                        <div >

                            <p className="mt-2 text-sm font-normal text-[#696969] leading-[20px]">Yoco enables us to securely process card payments, offering a trusted and convenient payment solution specifically designed for customers in South Africa.</p>

                            {/* Render Editable YOCO secret */}
                            {
                                store?.yocoSecret && <>
                                    {/* Yoco Secret */}
                                    <div className="mt-2">
                                        <div className="w-full">
                                            {
                                                isYocoSecretFieldVisible ? <div className="w-full">
                                                    {/* YOCO Editable Secret field */}
                                                    <div >
                                                        <label className="block text-sm text-[#232327] leading-[160%] font-medium" htmlFor="yocoSecret">New YOCO secret key</label>
                                                        <div className="relative">
                                                            <input onChange={(e) => setYocoSecret(e.target.value)} value={yocoSecret} className="w-full input-field placeholder:font-light  h-[45px] p-3 bg-[#F6F6F6] rounded-[4px]" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter YOCO secret" required />
                                                            <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{yocoPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                                        </div>
                                                        <div className="w-full flex gap-2 justify-end items-center mt-3">
                                                            <button type="button" onClick={() => handlePaymentMethodDeactivation("yoco")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-[6px] leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>
                                                            <button onClick={() => handlePaymentMethodActivation("yoco")} className="w-fit h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-[6px] leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                                        </div>
                                                    </div>

                                                </div>
                                                    : <div className="w-full">
                                                        <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="storeName">YOCO secret key</label>
                                                        <div className="w-full flex items-start justify-between">
                                                            <p className="w-[85%] text-sm text-[#696969] leading-[140%]">{formatSecret(store?.yocoSecret)}</p>
                                                            <span onClick={() => setIsYocoSecretFieldVisible(!isYocoSecretFieldVisible)} className="text-2xl text-[#232327] block cursor-pointer"><MdOutlineModeEditOutline /></span>
                                                        </div>
                                                    </div>
                                            }
                                        </div>

                                    </div>

                                </>
                            }

                            {
                                store?.yocoSecret && <div className={`w-full flex justify-end mt-3 ${isYocoSecretFieldVisible && "hidden"}`}>
                                    {!isYocoSecretFieldVisible && <button type="button" onClick={() => handlePaymentMethodDeactivation("yoco")} className="w-fit h-fit rounded-[4px] text-white text-sm font-medium px-3 py-[6px] leading-[18px] cursor-pointer bg-[#E93725] hover:bg-[#E93725] focus:bg-[#E93725]">Turn off</button>}
                                </div>
                            }
                        </div>


                        {/* Input Yoco Credentials */}
                        {
                            !store?.yocoSecret && <div className="mt-2">
                                {/* Render stripe secret field */}
                                <div className="relative">
                                    <label className="block text-sm text-[#232327] leading-[160%]  font-medium" htmlFor="stripeSecret">YOCO secret key</label>
                                    <input onChange={(e) => setYocoSecret(e.target.value)} className="w-full h-[45px] input-field placeholder:font-light  p-3 bg-[#F6F6F6] rounded-[4px]" type={yocoPasswordVisible ? "text" : "password"} name="stripeSecret" id="stripeSecret" placeholder="Enter stripe secret" />
                                    <span onClick={() => setYocoPasswordVisible(!yocoPasswordVisible)} className="absolute bottom-3 right-3  text-[#696969] cursor-pointer text-xl">{yocoPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                                </div>
                                <p className=" font-normal mt-[2px] leading-[140%] text-xs text-[#696969]">For retrieving your Yoco Secret, visit the <Link className="font-bold hover:underline" to="https://developer.yoco.com/online/resources/integration-keys" target='_blank'>YOCO API documentation.</Link></p>

                                <div className="w-full flex justify-end">
                                    <button onClick={() => handlePaymentMethodActivation("yoco")} className=" w-fit mt-2 h-fit rounded-[4px] text-[#232327] text-xs font-medium px-5 py-[6px] leading-[18px] cursor-pointer bg-[#E5E7EB] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB]">Save</button>
                                </div>
                            </div>
                        }
                    </div>


                </div>

            </div>


        </div>

        <p className="text-center font-normal mt-1 text-base flex justify-center text-[#696969] items-center gap-1"> <MdEmail className="text-2xl" /> <Link to="/payments/request">Request payment method</Link></p>




        {/* Bottom bar */}
        <BottomBar />
    </main>
}

export default PaymentMethods