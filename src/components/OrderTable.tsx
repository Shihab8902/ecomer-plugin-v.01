import { VscSettings } from "react-icons/vsc";
import useOrderInfo from "../hooks/useOrderInfo";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";


export const OrderTable = () => {

    const navigate = useNavigate();

    const { orders, refetchOrders, ordersLoading } = useOrderInfo();


    return <div>
        {/* Top bar */}
        <div className="flex justify-between flex-wrap  items-center border-b pb-1">
            <h3 className="text-center font-semibold text-2xl">Recent Orders</h3>
            <div className="flex items-center gap-5">
                <button onClick={() => navigate("/store/manage")} className="flex items-center gap-1 w-fit focus:bg-black bg-[#232327] h-[36px] px-3 rounded-md hover:bg-black text-white"> <VscSettings />Manage Store</button>
                <UserAvatar />
            </div>
        </div>

        {/* Filter */}
        <div className="flex justify-end mt-5">
            <div className="max-w-64 ">
                <select onChange={(e) => {
                    // setFilterValue(e.target.value)
                }
                } name="filter" defaultValue="" id="filter" className="w- rounded-md px-3 cursor-pointer font-semibold  outline-none">
                    <option value="" disabled>Filter By</option>
                    <option value="All">All</option>
                    <option value="Order Received" >Order Received</option>
                    <option value="Preparing Order">Preparing Order</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Order Completed">Order Completed</option>
                </select>
            </div>
        </div>











    </div>
}
