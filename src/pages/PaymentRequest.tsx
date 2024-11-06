import { useContext, useState } from "react"
import BottomBar from "../components/BottomBar"
import LoaderSpinner from "../components/LoaderSpinner"
import UserAvatar from "../components/UserAvatar"
import useAxiosPublic from "../hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/AuthProvider"
import { framer } from "framer-plugin"
import TopBar from "../components/TopBar"


const PaymentRequest = () => {

    const [isMessageSending, setIsMessageSending] = useState(false);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);


    //Handle for submit
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsMessageSending(true);

        const providerName = e.target.providerName.value;
        const providerWebsite = e.target.providerWebsite.value;
        const providerAPI = e.target.providerAPI.value;
        const description = e.target.description.value;

        const data = {
            user: user?.email,
            providerName,
            providerWebsite,
            providerAPI,
            description
        }

        axiosPublic.put("/payment/request", data)
            .then(res => {
                if (res.data === "success") {
                    framer.notify("Your message has been successfully sent. We'll get back to you shortly!", {
                        durationMs: 3000,
                        variant: "success"
                    });

                    navigate(-1);
                    e.target.reset();
                    setIsMessageSending(false);
                }
            })
            .catch(error => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error"
                });
                setIsMessageSending(false);
            })


    }



    return <main className="mt-[72px] mb-[80px]  min-h-[77vh] w-full">
        {/* Top bar */}
        <TopBar title="Payment request" showIcon={true} />



        {/* Contents */}
        <div className="w-full px-5">

            <form onSubmit={handleFormSubmit} className="bg-white py-3 px-4 rounded-lg">
                <div>
                    <label className="text-[#232327] mb-[2px] text-base font-medium leading-[160%]" htmlFor="providerName">Payment provider name <span className="text-[#E93725]">*</span></label>
                    <input className="w-full rounded-[4px] placeholder:font-light input-field h-12 px-12 bg-[#F6F6F6]" type="text" name="providerName" placeholder="Enter provider name" required />
                </div>

                <div className="mt-2">
                    <label className="text-[#232327] mb-[2px] text-base font-medium leading-[160%]" htmlFor="providerWebsite">Provider website link <span className="text-[#E93725]">*</span></label>
                    <input className="w-full rounded-[4px] placeholder:font-light input-field h-12 px-12 bg-[#F6F6F6]" type="text" name="providerWebsite" placeholder="Enter website link" required />
                </div>

                <div className="mt-2">
                    <label className="text-[#232327] mb-[2px] text-base font-medium leading-[160%]" htmlFor="providerWebsite">Service provider API link <span className="text-[#23232766]">(optional)</span></label>
                    <input className="w-full rounded-[4px] placeholder:font-light input-field h-12 px-12 bg-[#F6F6F6]" type="text" name="providerAPI" placeholder="Enter API link" />
                </div>

                <div className="mt-1">
                    <label className="text-[#232327] mb-[2px] text-sm font-medium leading-[160%]" htmlFor="providerWebsite">Describe why you need the payment method <span className="text-[#E93725]">*</span></label>
                    <textarea className="w-full p-3 placeholder:font-light input-field rounded-[4px] bg-[#F6F6F6] h-28" name="description" placeholder="Write Description..." required />
                </div>

                <button type="submit" disabled={isMessageSending} className="w-full mt-4 disabled:bg-[#232327] bg-[#232327] rounded-[4px] h-fit py-3 leading-[150%] hover:bg-black font-medium text-base text-white flex items-center justify-center gap-2 ">
                    {
                        isMessageSending ? <><span>Sending</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Send"
                    }
                </button>
            </form>

        </div>


        <BottomBar />
    </main>
}

export default PaymentRequest