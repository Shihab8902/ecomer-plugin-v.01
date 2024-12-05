import BottomBar from "../components/BottomBar"
import TopBar from "../components/TopBar"
import { MdContentCopy, MdOutlineCheckCircle } from "react-icons/md";
import useStoreInfo from "../hooks/useStoreInfo";
import { framer } from "framer-plugin";
import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {  FaRegFileAlt } from "react-icons/fa";

const Tutorial = () => {

    const { currentStore: store, refetchStore } = useStoreInfo();
    const [isStoreIdCopied, setIsStoreIdCopied] = useState(false);
    const [expendAcc1, setExpendAcc1] = useState(false);
    const [expendAcc2, setExpendAcc2] = useState(false);
    const [expendAcc3, setExpendAcc3] = useState(false);



    const axiosPublic = useAxiosPublic();

    //Handle Store Id copy
    const handleStoreIdCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(store?.storeId)
            .then(() => {
                setIsStoreIdCopied(true);
                framer.notify("Copied to clipboard!", {
                    durationMs: 3000,
                    variant: "success",
                })
            })
    }

    function formatText(text: string): string {
        if (text) {
            const firstPart = text.slice(0, 9);
            const middle = "********";
            const lastPart = text.slice(-6);

            return `${firstPart}${middle}${lastPart}`;
        }
    }


    //Handle update for step fulfill
    const handleStepCompletion = (index: number) => {
        switch (index) {
            case 1: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 1 })
                    .then((res) => {
                        if (res.data?.success) {
                            framer.notify("Marked as Done.", {
                                variant: "success",
                                durationMs: 3000
                            });
                            refetchStore();
                            setExpendAcc1(false);

                        }
                    })
                    .catch(error => {
                        framer.notify(error.message, {
                            variant: "error",
                            durationMs: 3000
                        })
                    });

                return;
            }

            case 2: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 2 })
                    .then((res) => {
                        if (res.data?.success) {
                            framer.notify("Marked as Done.", {
                                variant: "success",
                                durationMs: 3000
                            });
                            refetchStore();
                            setExpendAcc2(false);
                        }
                    })
                    .catch(error => {
                        framer.notify(error.message, {
                            variant: "error",
                            durationMs: 3000
                        })
                    });

                return;
            }


            case 3: {
                axiosPublic.put(`/store/setup?storeId=${store?.storeId}`, { index: 3 })
                    .then((res) => {
                        if (res.data?.success) {
                            framer.notify("Marked as Done.", {
                                variant: "success",
                                durationMs: 3000
                            });
                            refetchStore();
                            setExpendAcc3(false);
                        }
                    })
                    .catch(error => {
                        framer.notify(error.message, {
                            variant: "error",
                            durationMs: 3000
                        })
                    });

                return;
            }

            default: {
                return framer.notify("Invalid operation!", {
                    variant: "error",
                    durationMs: 3000
                })
            }

        }

    }


    return <div>
        <TopBar title="Setup guide" showIcon={false} />

        {/* Content */}
        <div className={`px-5 mt-[63px] mb-[72px] flex min-h-[77vh] w-full flex-col gap-5 bg-[#F1F1F1]`}>

            {/* Accordions */}
            <div className="my-2">

                {/* Template remix */}
                <div onClick={() => setExpendAcc1(!expendAcc1)} className={`py-3 px-4 ${expendAcc1 ? "max-h-[600px]" : "max-h-[52px]"} transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232323] leading-[160%]">Step 1: Remix the starter template</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 1) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc1 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={`  mt-3 ${expendAcc1 ? "opacity-100" : "opacity-0"} transition-opacity  duration-300  opacity-0`}>
                        <div className="bg-[#F6F6F6]  w-full px-3 pt-3 rounded-[4px]">
                            <img src="remix.png" alt="Template preview" className="w-full h-[324px]" />
                        </div>

                        <Link to="https://framer.com/projects/new?duplicate=y7nKoZJCd7roMdEXiGxM" target="_blank">  <button className="my-3 rounded-[4px] w-full hover:bg-black bg-[#232327] text-white font-semibold text-base h-12">Remix Template</button></Link>
                        {
                            !store?.setupSteps?.some(step => step.index === 1) && <button onClick={() => handleStepCompletion(1)} className="w-full h-fit py-3 text-base font-semibold leading-[160%} done-button hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                        }
                    </div>
                </div>


                {/* Store Id copy */}
                <div onClick={() => setExpendAcc2(!expendAcc2)} className={`py-3 mt-2 px-5 ${expendAcc2 ? "max-h-[700px]" : "max-h-[52px]"} transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232327] leading-[160%]">Step 2: Add store ID</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 2) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc2 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={` ${expendAcc2 ? "opacity-100" : "opacity-0"} mt-2 transition-opacity duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm font-normal text-[#696969] leading-[160%]">First copy your store id below:</p>
                        <div className="p-3 bg-[#FFEFAF] flex items-center justify-between w-full rounded-[4px]">
                            <p className="text-sm text-[#232327] font-medium">{formatText(store?.storeId)}</p> <span onClick={handleStoreIdCopy} className="text-[22px] text-[#232327]" ><MdContentCopy /></span>
                        </div>
                        {/* Step list */}
                        <ul className="mt-5 list-decimal px-4" >
                            <li className="text-sm leading-[160%] font-normal text-[#696969]">Begin by opening the starter template.</li>
                            <li className="text-sm leading-[160%] font-normal text-[#696969]">Double-click on the footer component to access it.</li>
                            <li className="text-sm leading-[160%] font-normal text-[#696969]">Within the footer, look for a code component named <span className="text-[#232327] font-medium">"Store ID Injector."</span></li>
                            <li className="text-sm leading-[160%] font-normal text-[#696969]">Copy your store ID and paste it into the property control of the <span className="text-[#232327] font-medium">"Store ID Injector."</span></li>
                            <li className="text-sm leading-[160%] font-normal text-[#696969]">If needed, this code component can be placed in any other component that is shared across multiple pages.</li>
                        </ul>

                        <div className=" w-full mt-3">
                            <img className="h-[143px]" w-full src="storeId.png" alt="Store id placement instruction" />
                            {
                                !store?.setupSteps?.some(step => step.index === 2) && <button onClick={() => handleStepCompletion(2)} className="w-full h-fit mt-3 py-3 text-base font-semibold leading-[160%} done-button hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                            }

                        </div>
                    </div>
                </div>




                {/* Setting up payment method */}
                <div onClick={() => setExpendAcc3(!expendAcc3)} className={`py-3 px-5 ${expendAcc3 ? "max-h-64" : "max-h-[52px]"} mt-2 transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232323] leading-[160%]">Step 3: Set up payment methods</h4>
                        <div className="flex items-center">
                            {
                                store?.setupSteps?.some(step => step.index === 3) && <span className="text-xl text-[#38B818]"><MdOutlineCheckCircle /></span>
                            }
                            <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc3 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                        </div>
                    </div>

                    {/* Accordion content */}
                    <div className={` mt-2 ${expendAcc3 ? "opacity-100" : "opacity-0"} transition-opacity  duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm font-normal text-[#696969] leading-[160%]">Navigate to <Link to="/store/payments" className="text-[#232327] font-medium underline">Payment page</Link> to configure payment method.</p>
                        {
                            !store?.setupSteps?.some(step => step.index === 3) && <button onClick={() => handleStepCompletion(3)} className="w-full mt-3 h-fit py-3 text-base font-semibold leading-[160%} done-button hover:bg-white text-[#38B818] rounded-[4px]">Mark as Done</button>
                        }
                    </div>
                </div>

            </div>

            <p className="text-center font-medium text-[#696969] mt-1 hover:underline  text-base flex items-center gap-1 justify-center"> <FaRegFileAlt className="text-xl " /> <Link to="https://ecomer.framax.co/docs" target="_blank">View full documentation</Link></p>

        </div>


        <BottomBar />
    </div>
}

export default Tutorial