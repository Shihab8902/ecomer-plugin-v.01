import { useState } from "react";
import UserAvatar from "../components/UserAvatar"
import { useLocation, useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useOrderInfo from "../hooks/useOrderInfo";
import moment from "moment";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { framer } from "framer-plugin";
import useStoreInfo from "../hooks/useStoreInfo";
import BottomBar from "../components/BottomBar";


const ManageOrder = () => {

    const { state } = useLocation();
    const axiosPublic = useAxiosPublic();
    const { currentStore } = useStoreInfo();
    const { refetchOrders } = useOrderInfo({ filter: "All", currentStore: currentStore });
    const navigate = useNavigate();

    const [status, setStatus] = useState('');
    const [isOrderUpdating, setIsOrderUpdating] = useState(false);


    // Handle form submit
    const handleFormSubmit = e => {
        e.preventDefault();
        setIsOrderUpdating(true);

        const exp_deliver = e.target.exp_deliver.value;
        const data = {
            exp_deliver,
            newStatus: {
                message: e.target.fulfillmentStatus.value,
                date: moment().format('Do MMMM YYYY')
            }
        }


        axiosPublic.put(`orders?id=${state._id}`, data)
            .then((res) => {
                if (res.data) {
                    e.target.reset();
                    setIsOrderUpdating(false);
                    setStatus('');
                    framer.notify("Order updated successfully", {
                        durationMs: 3000,
                        variant: "success",
                    })
                    refetchOrders()
                        .then(() => {
                            navigate("/");
                        })

                }
            })
            .catch(error => {
                toast.error(error.message)
                setIsOrderUpdating(false);
            })
    }





    return <div className="mb-16">
        {/* Top bar */}
        <div className="flex justify-between flex-wrap  items-center border-b pb-1 px-5">
            <div className="flex items-center gap-2">
                <span onClick={() => navigate(-1)}><IoIosArrowRoundBack className="text-2xl cursor-pointer" /></span>
                <h3 className="text-center font-semibold text-2xl ">Manage Order</h3>
            </div>
            <div className="flex items-center gap-5">

                <UserAvatar />
            </div>
        </div>


        <form onSubmit={handleFormSubmit} className="my-5 max-w-80 mx-auto border p-5 rounded-lg mt-10" >
            <div>
                <label className="block text-sm mb-1 font-medium" htmlFor="order status">Fulfillment Status</label>
                <select onChange={(e) => setStatus(e.target.value)} value={status} defaultValue="" name="fulfillmentStatus" id="fulfillmentStatus" className="w-full cursor-pointer px-3 border rounded-md">
                    <option value="">Unchanged</option>
                    <option value="Order Received" disabled>Order Received</option>
                    <option disabled={state?.status?.find(s => s.message === "Preparing Order")} value="Preparing Order">Preparing Order</option>
                    <option disabled={state?.status?.find(s => s.message === "Order Shipped")} value="Order Shipped">Order Shipped</option>
                    <option disabled={state?.status?.find(s => s.message === "Order Completed")} value="Order Completed">Order Completed</option>
                </select>
            </div>

            <div className='mt-3'>
                <label className="block text-sm mb-1 font-medium" htmlFor="delivery date">Expected Delivery</label>
                <input className="w-full p-3 border cursor-pointer" type="date" name="exp_deliver" id="exp_deliver" defaultValue={state.exp_deliver} required />
            </div>

            <button type="submit" disabled={isOrderUpdating} className="w-full disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                {
                    isOrderUpdating ? <><span>Updating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Update"
                }
            </button>


        </form>



        <BottomBar />



    </div>
}

export default ManageOrder