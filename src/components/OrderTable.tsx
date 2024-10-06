import { VscSettings } from "react-icons/vsc";
import useOrderInfo from "../hooks/useOrderInfo";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";
import { useState } from "react";


export const OrderTable = () => {

    const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState("All");

    const { orders, ordersLoading } = useOrderInfo({ filter: filterValue });






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
                    setFilterValue(e.target.value)
                }
                } name="filter" defaultValue="" id="filter" className=" rounded-md px-3 cursor-pointer font-semibold  outline-none">
                    <option value="" disabled>Filter By</option>
                    <option value="All">All</option>
                    <option value="Order Received" >Order Received</option>
                    <option value="Preparing Order">Preparing Order</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Order Completed">Order Completed</option>
                </select>
            </div>
        </div>


        {/* Display order table */}
        {
            ordersLoading ? <LoaderSpinner shapeHeight="40" shapeWidth="40" shapeColor="#6E717D" /> : orders?.length < 1 ? <h3 className="text-center text-base mt-10">No order data found!</h3> :
                <div className="overflow-x-auto mt-10">
                    <table className=" table text-center min-w-[600px]  border-collapse border-spacing-0 w-full ">

                        <thead className="border-b text-sm ">
                            <tr>
                                <th>Sl.</th>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Fulfillment Status</th>
                                <th>Payment Method</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders?.map((order: object, index: number) => {
                                    return <tr onClick={() => navigate("/order/details", { state: order })} key={order?._id} className="border-b py-3 hover:bg-[#F4F4FC] cursor-pointer">
                                        <td className="text-[#6E717D] text-sm py-3">{index + 1}</td>
                                        <td className="text-[#6E717D] text-sm py-3">{order.orderNumber}</td>
                                        <td className="text-[#6E717D] text-sm py-3">{order.orderedAt}</td>

                                        <td style={{ color: order.status.map(status => status.message)[order.status.length - 1] === "Order Received" ? "#28A745" : order.status.map(status => status.message)[order.status.length - 1] === "Preparing Order" ? "#007BFF" : order.status.map(status => status.message)[order.status.length - 1] === "Order Shipped" ? "#ED8C05" : order.status.map(status => status.message)[order.status.length - 1] === "Order Completed" ? "#1FAC64" : "#6E717D" }} className={` text-sm   `}>{
                                            order.status.map(status => status.message)[order.status.length - 1]
                                        }</td>

                                        <td className="text-[#6E717D] text-sm py-3"> {order?.paymentMethod}</td>
                                        <td className="text-[#6E717D] text-sm py-3"> ${(order.subtotal / 100).toFixed(2)}</td>
                                        <td className="text-[#6E717D] text-sm py-3 text-end"> Details</td>

                                    </tr>
                                })
                            }
                        </tbody>










                    </table>
                </div>
        }








    </div>
}
