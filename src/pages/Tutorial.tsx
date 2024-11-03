import BottomBar from "../components/BottomBar"
import TopBar from "../components/TopBar"
import { MdContentCopy } from "react-icons/md";
import useStoreInfo from "../hooks/useStoreInfo";
import { framer } from "framer-plugin";
import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { GoCheckCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const Tutorial = () => {

    const { currentStore: store } = useStoreInfo();
    const [isStoreIdCopied, setIsStoreIdCopied] = useState(false);
    const [expendAcc1, setExpendAcc1] = useState(false);
    const [expendAcc2, setExpendAcc2] = useState(false);
    const [expendAcc3, setExpendAcc3] = useState(false);
    const [expendAcc4, setExpendAcc4] = useState(false);

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


    return <div>
        <TopBar title="Setup guide" showIcon={false} alternativeAvatar={false} />

        {/* Content */}
        <div className={`px-5 mt-[63px] mb-[72px] flex min-h-[77vh] w-full flex-col gap-5 bg-[#F1F1F1]`}>

            {/* Accordions */}
            <div className="my-2">

                {/* Template remix */}
                <div onClick={() => setExpendAcc1(!expendAcc1)} className={`py-3 px-5 ${expendAcc1 ? "max-h-48" : "max-h-[52px]"} transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232323] leading-[160%]">Step 1: Start with the template</h4>
                        <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc1 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                    </div>

                    {/* Accordion content */}
                    <div className={`bg-[#F6F6F6] p-3 mt-2 ${expendAcc1 ? "opacity-100" : "opacity-0"} transition-opacity flex justify-between items-center duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm font-normal text-[#696969] leading-[160%]">Remix the starter template.</p>
                        <span className="text-xl text-[#232327]"><GoCheckCircle /></span>
                    </div>
                </div>


                {/* Store Id copy */}
                <div onClick={() => setExpendAcc2(!expendAcc2)} className={`py-3 mt-2 px-5 ${expendAcc2 ? "max-h-48" : "max-h-[52px]"} transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232327] leading-[160%]">Step 2: Copy your store ID</h4>
                        <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc2 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                    </div>

                    {/* Accordion content */}
                    <div className={`bg-[#F6F6F6] p-3 ${expendAcc2 ? "opacity-100" : "opacity-0"} mt-2 transition-opacity duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm font-normal text-[#696969] leading-[160%]">Copy your store id from below:</p>
                        <div className={`px-3 flex items-center justify-between  rounded-[4px] mt-1 py-2 bg-[#FFFFFF]`}>
                            <p className="text-xs text-[#232327] font-medium">{store?.storeId}</p> <span onClick={handleStoreIdCopy} className="text-2xl text-[#232327] rotate-[180deg]" ><MdContentCopy /></span>
                        </div>
                    </div>
                </div>


                {/* Add Store Id */}
                <div onClick={() => setExpendAcc3(!expendAcc3)} className={`py-3 mt-2 px-5 ${expendAcc3 ? " max-h-[500px]" : "max-h-[52px]"} transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232327] leading-[160%]">Step 3: Add store ID</h4>
                        <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc3 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                    </div>

                    {/* Accordion content */}
                    <div className={`bg-[#F6F6F6] p-3 mt-2 ${expendAcc3 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm text-[#696969] font-normal leading-[160%]">Open the starter template and double click on the footer component. Here you will find  a code component name <span className="font-medium text-[#232327]">“Store Id Injector”</span>, paste the store id on its property control. (This code component can also be placed on any other component that is shared across multiple pages.)</p>
                        <img className="h-36 border border-[#EAEAEA] rounded-[4px] mt-3" src="storeId.png" alt="Store Id copy reference image" />
                    </div>
                </div>


                {/* Setting up payment method */}
                <div onClick={() => setExpendAcc4(!expendAcc4)} className={`py-3 px-5 ${expendAcc4 ? "max-h-64" : "max-h-[52px]"} mt-2 transition-all duration-300 overflow-hidden  rounded-[4px] cursor-pointer bg-[#FFFFFF]`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-base text-[#232323] leading-[160%]">Step 4: Set up payment methods</h4>
                        <span className={`text-2xl text-[#23232780]`}><RxCaretDown className={`${expendAcc4 ? "rotate-180" : "rotate-0"} transition-transform duration-500`} /></span>
                    </div>

                    {/* Accordion content */}
                    <div className={`bg-[#F6F6F6] p-3 mt-2 ${expendAcc4 ? "opacity-100" : "opacity-0"} transition-opacity flex justify-between items-center duration-300 rounded-lg opacity-0`}>
                        <p className="text-sm font-normal text-[#696969] leading-[160%]"><span className=" font-medium">Receiving payments:</span> To turn on or off all the available payment methods, navigate to the <Link to="/store/payments" className="text-[#232323] underline ">Payment</Link> tab. Cash on delivery payment method is active by default. You can also add other available methods to your store by following the on page instructions.</p>

                    </div>
                </div>

            </div>

        </div>


        <BottomBar />
    </div>
}

export default Tutorial