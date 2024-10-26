import { useContext, useState } from "react"
import BottomBar from "../components/BottomBar"
import LoaderSpinner from "../components/LoaderSpinner"
import UserAvatar from "../components/UserAvatar"
import useAxiosPublic from "../hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/AuthProvider"
import { framer } from "framer-plugin"


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



    return <main className="mb-16">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1 px-5">
            <div className="flex items-center gap-2">

                <h3 className="text-center font-semibold text-2xl ">Payment Request</h3>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>



        {/* Contents */}
        <div className="my-5 max-w-96 mx-auto border p-5 rounded-lg">

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label className="text-sm mb-1 block font-medium" htmlFor="providerName">Name of the payment service provider*</label>
                    <input className="w-full p-3 rounded-md mb-2  h-10" type="text" name="providerName" placeholder="Enter provider name" required />
                </div>

                <div className="mt-1">
                    <label className="text-sm mb-1 block font-medium" htmlFor="providerWebsite">Provider website link*</label>
                    <input className="w-full p-3 rounded-md mb-2  h-10" type="text" name="providerWebsite" placeholder="Enter website link" required />
                </div>

                <div className="mt-1">
                    <label className="text-sm mb-1 block font-medium" htmlFor="providerWebsite">Service provider API link <span className="text-gray-400">(optional)</span></label>
                    <input className="w-full p-3 rounded-md mb-2  h-10" type="text" name="providerAPI" placeholder="Enter API link" />
                </div>

                <div className="mt-1">
                    <label className="text-sm mb-1 block font-medium" htmlFor="providerWebsite">Describe why you need this payment method*</label>
                    <textarea className="w-full p-3 rounded-md mb-2  h-28" name="description" placeholder="Enter Description" required />
                </div>

                <button type="submit" disabled={isMessageSending} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-2">
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