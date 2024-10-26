import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import BottomBar from "../components/BottomBar";
import useStoreInfo from "../hooks/useStoreInfo";


const OrderDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { currentStore } = useStoreInfo();

    const { orderNumber, orderedAt, status: orderStatus, exp_deliver, paymentMethod, shipping_details, products, subtotal } = state;

    const formatDate = (dateString: string) => {
        if (dateString === "unknown") {
            return "unknown";
        }

        const date = moment(dateString);
        return date.format('Do MMMM YYYY');
    };


    return <main className="mb-16">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1 flex-wrap px-5">
            <div className="flex items-center gap-2">
                <span onClick={() => navigate(-1)}><IoIosArrowRoundBack className="text-2xl cursor-pointer" /></span>
                <h3 className="text-center font-semibold text-2xl ">Order {orderNumber}</h3>
            </div>
            <div className="flex items-center gap-5">
                <button onClick={() => navigate("/order/manage", { state: state })} className="flex items-center gap-1 w-fit focus:bg-black bg-[#232327] h-[36px] px-3 rounded-md hover:bg-black text-white"> <CiEdit className="text-lg" /> Manage Order</button>
                <UserAvatar />
            </div>
        </div>



        {/*  Shipping  and order information */}
        <div className="flex justify-between flex-wrap px-5">

            {/* Order information */}
            <div className="w-full">
                <h4 className=" font-semibold leading-6 text-base mt-5 mb-2">Order Information: </h4>
                <ul>
                    <div className="flex gap-1 flex-wrap">
                        <li className="text-sm font-semibold  leading-5">Placed On: <span className=" font-medium text-[#6E717D]">{orderedAt}</span>,</li>
                        <li className="text-sm font-semibold  leading-5 flex items-center gap-1">Fulfillment Status:
                            <div style={{ color: orderStatus.map(status => status.message)[orderStatus?.length - 1] === "Order Received" ? "#28A745" : orderStatus.map(status => status.message)[orderStatus?.length - 1] === "Preparing Order" ? "#007BFF" : orderStatus.map(status => status?.message)[orderStatus?.length - 1] === "Order Shipped" ? "#ED8C05" : orderStatus.map(status => status?.message)[orderStatus?.length - 1] === "Order Completed" ? "#1FAC64" : "#6E717D" }} className={` text-sm   `}>{
                                orderStatus?.map(status => status?.message)[orderStatus?.length - 1]
                            }</div>
                        </li>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                        <li className="text-sm font-semibold  leading-5">Expected Delivery: <span className=" font-medium text-[#6E717D]">{formatDate(exp_deliver)}</span>,</li>
                        <li className="text-sm font-semibold  leading-5">Payment Method: <span className=" font-medium text-[#6E717D]">{paymentMethod}</span></li>
                    </div>
                </ul>
            </div>

            {/* Shipping Information */}
            <div className="w-full">
                <h4 className=" font-semibold leading-6 text-base mt-5 mb-2">Shipping Information: </h4>
                <ul>
                    <li className="text-sm font-semibold  leading-5">Name:  <span className=" font-medium text-[#6E717D]">{shipping_details?.name}</span></li>
                    <li className="text-sm font-semibold  leading-5">Email:  <span className=" font-medium text-[#6E717D]">{shipping_details?.email}</span></li>
                    <li className="text-sm font-semibold flex items-center gap-1 leading-5 flex-wrap">Address:
                        <ul className="flex items-center gap-1 flex-wrap">
                            <li className="text-sm font-semibold  leading-5">State: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.state}</span></li>,
                            <li className="text-sm font-semibold  leading-5">City: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.city}</span></li>,
                            <li className="text-sm font-semibold  leading-5">Country: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.country}</span></li>,
                            <li className="text-sm font-semibold  leading-5">Postal Code: <span className=" font-medium text-[#6E717D]">{shipping_details?.address?.postal_code}</span></li>
                        </ul>
                    </li>
                    <li className="text-sm font-semibold flex gap-1 leading-5 flex-wrap">Additional:
                        {
                            shipping_details?.address?.additionalData
                                ?.map((data, index) => {
                                    const [key, value] = Object.entries(data)[0];
                                    return (
                                        <span key={index} className="text-sm font-semibold  leading-5">
                                            {key}: <span className="text-[#6E717D] font-medium">{value}</span>
                                            {index !== shipping_details?.address?.additionalData.length - 1 && ', '}
                                        </span>
                                    );
                                })
                        }
                    </li>

                </ul>
            </div>


        </div>



        {/* Order summary */}
        <h4 className=" font-semibold leading-6 text-base mt-6 mb-4 px-5">Order Summary: </h4>

        <div className="flex flex-col gap-3 px-5">
            {
                products?.map(product => {
                    return <div key={product?.uid}>
                        <div className="flex justify-between items-center flex-wrap">
                            <div className="flex items-center gap-5">
                                <div className=" w-16 h-16 bg-[#F5F6F8] px-2 py-1">
                                    <img className=" w-full h-full" src={product.image} alt="Image Unavailable" />

                                </div>
                                <div >
                                    <h4 className=" text-sm font-semibold leading-5 ">{product.productName}</h4>
                                    <div className="flex items-center  gap-8 mt-1">
                                        <p className=" text-sm leading-6">Qty: <span className="text-[#6E717D]">{product.quantity}</span></p>
                                        {
                                            product?.additionalData?.map((data, index) => {
                                                const [key, value] = Object.entries(data)[0];
                                                return <p key={index} className=" text-sm leading-6">{key}: <span className="text-[#6E717D]">{value}</span></p>
                                            })
                                        }

                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-[#6E717D] text-base leading-6 font-semibold ">{currentStore?.storeCurrency}{product.price}</p>


                            </div>
                        </div>
                    </div>
                })
            }

        </div>

        {/* Divider */}
        <div className="w-full mt-3 h-[1px] border-b px-5"></div>

        {/* Subtotal */}
        <div className="mt-1 flex justify-between items-center px-5">
            <h5 className=" font-bold leading-6 text-base">Subtotal: </h5>
            <p className=" font-bold leading-6 text-base">{currentStore?.storeCurrency}{(subtotal / 100).toFixed(2)}</p>
        </div>

        <BottomBar />



    </main>
}

export default OrderDetails