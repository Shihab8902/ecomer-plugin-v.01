import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar";
import moment from "moment";


const OrderDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { orderNumber, orderedAt, status: orderStatus, exp_deliver, paymentMethod, shipping_details } = state;

    const formatDate = (dateString: string) => {
        if (dateString === "unknown") {
            return "unknown";
        }

        const date = moment(dateString);
        return date.format('Do MMMM YYYY');
    };


    return <main className="px-5">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1">
            <div className="flex items-center gap-2">
                <span onClick={() => navigate(-1)}><IoIosArrowRoundBack className="text-2xl cursor-pointer" /></span>
                <h3 className="text-center font-semibold text-2xl ">Order {orderNumber}</h3>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>



        {/* Order & Shipping information */}
        <div className="flex justify-between">

            {/* Shipping Information */}
            <div >
                <h4 className=" font-semibold leading-6 text-base mt-5 mb-2">Shipping Information: </h4>
                <ul>
                    <li className="text-sm font-semibold  leading-5">Name:  <span className=" font-medium text-[#6E717D]">{shipping_details?.name}</span></li>
                    <li className="text-sm font-semibold  leading-5">Email:  <span className=" font-medium text-[#6E717D]">{shipping_details?.email}</span></li>
                    <li className="text-sm font-semibold flex items-center gap-1 leading-5">Address:
                        <ul className="flex items-center gap-1">
                            <li className="text-sm font-semibold  leading-5">State: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.state}</span></li>,
                            <li className="text-sm font-semibold  leading-5">City: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.city}</span></li>,
                            <li className="text-sm font-semibold  leading-5">Country: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.country}</span></li>,
                            <li className="text-sm font-semibold  leading-5">Postal Code: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.postal_code}</span></li>
                        </ul>
                    </li>
                    <li className="text-sm font-semibold  leading-5">Additional:
                        {
                            shipping_details?.address?.additionalData
                                ?.map((data, index) => {
                                    const [key, value] = Object.entries(data)[0];
                                    return (
                                        <span key={index} className="text-sm font-semibold text-[#232327] leading-5">
                                            {key}: <span className="text-[#6E717D] font-medium">{value}</span>
                                            {index !== shipping_details?.address?.additionalData.length - 1 && ', '}
                                        </span>
                                    );
                                })
                        }
                    </li>

                </ul>
            </div>


            {/* Order information */}
            <div>
                <h4 className=" font-semibold leading-6 text-base mt-5 mb-2">Order Information: </h4>
                <ul>
                    <li className="text-sm font-semibold  leading-5">Placed On: <span className=" font-medium text-[#6E717D]">{orderedAt}</span></li>
                    <li className="text-sm font-semibold  leading-5 flex items-center gap-1">Fulfillment Status:
                        <div style={{ color: orderStatus.map(status => status.message)[orderStatus.length - 1] === "Order Received" ? "#28A745" : orderStatus.map(status => status.message)[orderStatus.length - 1] === "Preparing Order" ? "#007BFF" : orderStatus.map(status => status.message)[order.status.length - 1] === "Order Shipped" ? "#ED8C05" : orderStatus.map(status => status.message)[order.status.length - 1] === "Order Completed" ? "#1FAC64" : "#6E717D" }} className={` text-sm   `}>{
                            orderStatus.map(status => status.message)[orderStatus.length - 1]
                        }</div>
                    </li>
                    <li className="text-sm font-semibold  leading-5">Expected Delivery: <span className=" font-medium text-[#6E717D]">{formatDate(exp_deliver)}</span></li>
                    <li className="text-sm font-semibold  leading-5">Payment Method: <span className=" font-medium text-[#6E717D]">{paymentMethod}</span></li>
                </ul>
            </div>


        </div>



        {/* Order summary */}
        <h4 className=" font-semibold leading-6 text-base mt-5 mb-2">Order Information: </h4>





    </main>
}

export default OrderDetails