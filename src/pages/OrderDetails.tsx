import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment";
import toast from 'react-hot-toast';
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useGetDataPublic from "../hooks/useGetPublic";
import LoaderSpinner from "../components/LoaderSpinner";
import useStoreInfo from "../hooks/useStoreInfo";
import { GoDotFill } from "react-icons/go";




const OrderDetails = () => {
    const { state: reqId } = useLocation();
    const { user } = useContext(UserContext);
    const { currentStore } = useStoreInfo();
    const axiosPublic = useAxiosPublic();

    //States
    const [isNoteEditable, setIsNoteEditable] = useState(false);



    //Fetch order data
    const { data: orderData, refetch: refetchOrders, isLoading } = useGetDataPublic([reqId, "order"], `/order?id=${reqId}`)

    const { _id, orderNumber, shipping_details, billing_details, status, exp_deliver, additionalCustomerData, additionalShippingData, additionalProductData, additionalPaymentData, note, products, paymentStatus, paymentMethod, additionalCharges, timelineStatus } = orderData || {};




    //Product subtotal calculation
    const calculatedSubtotal = products?.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice),
        0
    )

    //Format date
    const formatDate = (dateString: string) => {
        if (dateString === "unknown") {
            return "unknown";
        }

        const date = moment(dateString);
        return date.format('Do MMMM YYYY');
    };


    //Handle timeline status update
    const setTimelineStatus = async (message: string) => {
        const data = {
            newTimelineStatus: {
                updateBy: user?.displayName,
                updateDate: moment().format('DD MMM YYYY'),
                updateTime: moment().format('h:mm A'),
                message
            }
        }

        await axiosPublic.put(`/orders?id=${_id}`, data)

    }



    //Handle order status
    const handleOrderStatusUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        const data = {
            newStatus: {
                message: status,
                date: moment().format('Do MMMM YYYY')
            }
        }

        axiosPublic.put(`/orders?id=${_id}`, data)
            .then(async (res) => {
                if (res.data) {
                    //update timeline status
                    await setTimelineStatus(`marked the delivery status as "${status}"`);
                    refetchOrders();
                    framer.notify("Delivery status updated!", {
                        variant: "success",
                        durationMs: 3000
                    })
                }
            })
            .catch(error => {
                framer.notify(error.message, {
                    variant: "error",
                    durationMs: 3000
                })
            })

    }


    //Handle expected delivery
    const handleExpDeliveryUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const data = { exp_deliver: e.target.value }

        axiosPublic.put(`/orders?id=${_id}`, data)
            .then(async (res) => {
                if (res.data) {
                    //Update timeline status
                    await setTimelineStatus(exp_deliver === "unknown" ? "assigned an expected delivery date for this order" : "updated the expected delivery date for this order")
                    refetchOrders();
                    framer.notify("Expected delivery date updated!", {
                        variant: "success",
                        durationMs: 3000
                    })

                }
            })
    }


    //Handle note update
    const handleNoteUpdate = e => {
        const textArea = e.target;

        //Resize based on text area
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;

        //Update note in real time
        axiosPublic.put(`/orders?id=${_id}`, { note: textArea.value })
            .then(async (res) => {
                if (res.data) {
                    refetchOrders();
                }
            })
            .catch(error => {
                framer.notify(error.message, {
                    variant: "error",
                    durationMs: 3000
                })
            })

    }


    //Handle payment status
    const handlePaymentStatus = e => {
        axiosPublic.put(`/orders?id=${_id}`, { paymentStatus: e.target.value })
            .then(async (res) => {
                if (res.data) {
                    await setTimelineStatus("Updated the payment status.")
                    refetchOrders();
                    framer.notify("Payment status updated.", { variant: "success", durationMs: 3000 });
                }
            })
            .catch(error => {
                framer.notify(error.message, {
                    variant: "error",
                    durationMs: 3000
                })
            })
    }

    if (isLoading) {
        return <LoaderSpinner shapeColor="#6E717D" shapeWidth="40" shapeHeight="40" />
    }


    return <div>
        {/* Top Bar */}
        <TopBar title={`Order ${orderNumber}`} showIcon={true} />



        {/* Content Boxes*/}
        <div className="w-full mt-[70px] mb-[82px] px-5">

            {/* Customer Details */}
            <div className="w-full bg-white py-3 px-4 rounded-[4px]">
                <h3 className="text-[#232327] text-base leading-[140%} font-semibold mb-3">Customer</h3>

                <div className="w-full">
                    {/* Name */}
                    <div>
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Name</h4>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">{shipping_details?.name}</p>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-2">
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Contact information</h4>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">{shipping_details?.email}</p>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">{shipping_details?.phone}</p>
                    </div>


                    {/* Billing Information */}
                    {
                        billing_details && <div className="mt-2">
                            <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Billing address</h4>

                            <ul className="flex items-center flex-wrap">
                                {
                                    Object.entries(billing_details?.address || {})
                                        .filter(([key, _]) => key !== 'additionalData')
                                        .map(([key, value], index, array) => (
                                            <li key={index} className="text-sm ml-[2px]  text-[#232327] leading-[160%]">
                                                {key}: <span className="text-[#696969]">
                                                    {typeof value === 'object' && value !== null
                                                        ? JSON.stringify(value)
                                                        : String(value)
                                                    }
                                                </span>
                                                {index !== array.length - 1 && ', '}
                                            </li>
                                        ))
                                }
                            </ul>

                        </div>
                    }

                    {/* Shipping Information */}
                    <div className="mt-2">
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Shipping address</h4>

                        <ul className="flex items-center flex-wrap">
                            {
                                Object.entries(shipping_details?.address || {})
                                    .filter(([key, _]) => key !== 'additionalData')
                                    .map(([key, value], index, array) => (
                                        <li key={index} className="text-sm ml-[2px]  text-[#232327] font-normal leading-[160%]">
                                            {key}: <span className="text-[#696969]">
                                                {typeof value === 'object' && value !== null
                                                    ? JSON.stringify(value)
                                                    : String(value)
                                                }
                                            </span>
                                            {index !== array.length - 1 && ', '}
                                        </li>
                                    ))
                            }
                        </ul>

                    </div>

                    {/* Additional Information */}
                    {
                        shipping_details?.address?.additionalData && <div className="mt-2">
                            <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Additional information</h4>
                            <div className="flex items-center flex-wrap">
                                {
                                    shipping_details?.address?.additionalData
                                        ?.map((data, index) => {
                                            const [key, value] = Object.entries(data as Record<string, unknown>)[0];
                                            return (
                                                <span key={index} className="text-sm ml-[2px] font-normal text-[#232327] leading-[160%]">
                                                    {key}: <span className="text-[#696969]">{String(value)}</span>
                                                    {index !== shipping_details?.address?.additionalData.length - 1 && ', '}
                                                </span>
                                            );
                                        })
                                }

                            </div>
                        </div>
                    }


                    {/* Customer dedicated additional Information */}
                    {
                        additionalCustomerData?.length > 0 && <div className="mt-2">
                            <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Additional information</h4>
                            <div className="flex items-center flex-wrap">
                                {
                                    additionalCustomerData
                                        ?.map((data, index) => {
                                            const [key, value] = Object.entries(data as Record<string, unknown>)[0];
                                            return (
                                                <span key={index} className="text-sm ml-[2px] font-normal text-[#232327] leading-[160%]">
                                                    {key}: <span className="text-[#696969]">{String(value)}</span>
                                                    {index !== additionalCustomerData.length - 1 && ', '}
                                                </span>
                                            );
                                        })
                                }

                            </div>
                        </div>
                    }

                </div>

            </div>

            {/* Shipping Details */}
            <div className="w-full bg-white py-3 px-4 rounded-[4px] mt-2">
                <h3 className="text-[#232327] text-base leading-[140%} font-semibold mb-3">Shipping</h3>

                <div className="w-full">
                    {/* Delivery status */}
                    <div>
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327] mb-2">Delivery status</h4>
                        {/* Delivery status here */}
                        <select onChange={handleOrderStatusUpdate} defaultValue={status?.map((status: { message: string, date: string }) => status?.message)[status?.length - 1]} className="bg-[#FFEFAF] px-2 rounded-[4px] focus:ring-0 h-[30px] cursor-pointer text-sm font-normal text-[#232327]" name="" id="">
                            <option value="Order Received" disabled>Order Received</option>
                            <option disabled={status?.find((status: { message: string, date: string }) => status?.message === "Preparing Order")} value="Preparing Order">Preparing Order</option>
                            <option disabled={status?.find((status: { message: string, date: string }) => status?.message === "Order Shipped")} value="Order Shipped">Order Shipped</option>
                            <option disabled={status?.find((status: { message: string, date: string }) => status?.message === "Order Completed")} value="Order Completed">Order Completed</option>
                        </select>
                    </div>

                </div>

                {/* Delivery method */}
                <div className="w-full mt-3">
                    <div>
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Delivery method</h4>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">Custom</p>
                    </div>
                </div>

                {/* Expected delivery date */}
                <div className="w-full mt-2 flex justify-between items-center">
                    <div>
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Expected delivery date</h4>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">
                            {formatDate(exp_deliver)}
                        </p>
                    </div>

                    <div className="relative">
                        <span className="text-2xl text-[#232327] block ">
                            <MdOutlineModeEditOutline />
                        </span>
                        <input onChange={handleExpDeliveryUpdate} defaultValue={exp_deliver} className="absolute bottom-[3px] right-[4px] w-full h-full opacity-0 cursor-pointer " type="date" />
                    </div>


                </div>

                {/* Additional Shipping Data */}
                {
                    additionalShippingData?.length > 0 && <div className="mt-2">
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Additional information</h4>
                        <div className="flex items-center flex-wrap">
                            {
                                additionalShippingData
                                    ?.map((data, index) => {
                                        const [key, value] = Object.entries(data as Record<string, unknown>)[0];
                                        return (
                                            <span key={index} className="text-sm ml-[2px] font-normal text-[#232327] leading-[160%]">
                                                {key}: <span className="text-[#696969]">{String(value)}</span>
                                                {index !== additionalShippingData.length - 1 && ', '}
                                            </span>
                                        );
                                    })
                            }

                        </div>
                    </div>
                }

            </div>

            {/* Note */}
            <div className="w-full bg-white py-3  rounded-[4px] mt-2">
                <h3 className="text-[#232327] text-base px-4 leading-[140%} font-semibold mb-3">Notes</h3>
                {/* Note Field*/}
                <div className="w-full flex justify-between">
                    <textarea defaultValue={note} readOnly={!isNoteEditable} onChange={handleNoteUpdate} className="w-[85%] caret-black bg-transparent text-sm text-[#696969] leading-[140%] px-4 focus:ring-0 min-h-5 resize-none" name="note" id="note" placeholder="Notes goes here"></textarea>
                    <span onClick={() => {
                        setIsNoteEditable(!isNoteEditable)
                        if (isNoteEditable) {
                            framer.notify("Editing is now disabled for this note.", { variant: "warning", durationMs: 3000 })
                        } else {
                            framer.notify("The note is now editable.", { variant: "success", durationMs: 3000 })
                        }
                    }} className="text-2xl text-[#232327] block mr-4 cursor-pointer ">
                        <MdOutlineModeEditOutline />
                    </span>
                </div>
            </div>


            {/* Product summary */}
            <div className="w-full bg-white py-3 px-4 rounded-[4px] mt-2">
                <h3 className="text-[#232327] text-base leading-[140%} font-semibold mb-3">{products?.length > 1 ? "Products" : "Product"}</h3>
                {/* Product card */}
                <div className="flex w-full flex-col gap-3">
                    {
                        products?.map(product => {
                            return <div key={product?._id} className="flex gap-2 w-full flex-1">
                                <img className="h-12 w-12 radius-[4px] object-cover" src={product?.image} alt="Image unavailable" />
                                <div className="w-full">
                                    <h3 className="text-[#232327] margin-0 text-sm font-medium leading-[140%]">{product?.productName}</h3>
                                    <div className="flex gap-2 items-center flex-wrap ">
                                        <p className="bg-[#F6F6F6] h-fit w-fit text-xs font-medium leading-[160%] text-[#232327] px-[6px] py-[2px] rounded-[4px] mt-1">
                                            Qty: <span className="text-[#696969] font-normal">{product?.quantity}</span>
                                        </p>
                                        {
                                            product?.additionalData?.map((data, index) => {
                                                const [key, value] = Object.entries(data)[0];
                                                return <p className="bg-[#F6F6F6] h-fit w-fit text-xs font-medium leading-[160%] text-[#232327] px-[6px] py-[2px] rounded-[4px] ">
                                                    {key}: <span className="text-[#696969] font-normal">{value}</span>
                                                </p>
                                            })
                                        }
                                    </div>
                                    <div className="flex justify-end mt-1">
                                        <span className="text-[#232327] font-medium text-xs leading-[160%]">{currentStore?.storeCurrency}{product?.price}</span>
                                    </div>

                                </div>
                            </div>
                        })
                    }
                </div>

                {/* Additional product data */}
                {
                    additionalProductData?.length > 0 && <div className="mt-2">
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Additional information</h4>
                        <div className="flex items-center flex-wrap">
                            {
                                additionalProductData
                                    ?.map((data, index) => {
                                        const [key, value] = Object.entries(data as Record<string, unknown>)[0];
                                        return (
                                            <span key={index} className="text-sm ml-[2px] font-normal text-[#232327] leading-[160%]">
                                                {key}: <span className="text-[#696969]">{String(value)}</span>
                                                {index !== additionalProductData.length - 1 && ', '}
                                            </span>
                                        );
                                    })
                            }

                        </div>
                    </div>
                }


            </div>

            {/* Payment information */}
            <div className="w-full bg-white py-3 px-4  rounded-[4px] mt-2">
                <h3 className="text-[#232327] text-base  leading-[140%} font-semibold mb-3">Payment</h3>

                <div className="w-full">
                    {/* Payment status */}
                    <div>
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327] mb-2">Payment status</h4>
                        <select onChange={handlePaymentStatus} defaultValue={paymentStatus} className="bg-[#FFEFAF] px-2 w-20 focus:ring-0 rounded-[4px] h-[30px] cursor-pointer text-sm font-normal text-[#232327]" >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>

                    {/* Payment method */}
                    <div className="mt-3">
                        <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Payment method</h4>
                        <p className="text-sm text-[#696969] leading-[140%] font-normal">{paymentMethod}</p>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-3 flex w-full justify-between items-center">
                        <div>
                            <h4 className="font-medium leading-[140%] text-base text-[#232327]">Subtotal</h4>
                            <p className="text-xs text-[#696969] leading-[140%] font-normal">{`${products?.length} ${products?.length === 1 ? "item" : "items"}`}</p>
                        </div>
                        <span className="text-[#232327] font-medium text-xs leading-[160%]">{currentStore?.storeCurrency}{parseFloat((calculatedSubtotal)?.toFixed(2))}</span>
                    </div>

                    {/* Discount */}
                    <div className="mt-3 flex w-full justify-between items-center">
                        <div>
                            <h4 className="font-medium leading-[140%] text-base text-[#232327]">Discount</h4>
                            <p className="text-xs text-[#696969] leading-[140%] font-normal">Custom discount</p>
                        </div>
                        <span className="text-[#232327] font-medium text-xs leading-[160%]">-{currentStore?.storeCurrency}{parseFloat(additionalCharges?.discount?.toFixed(2))}</span>
                    </div>

                    {/* Shipping */}
                    <div className="mt-3 flex w-full justify-between items-center">
                        <div>
                            <h4 className="font-medium leading-[140%] text-base text-[#232327]">Shipping</h4>
                            <p className="text-xs text-[#696969] leading-[140%] font-normal">Custom ({`${products?.length} ${products?.length === 1 ? "item" : "items"}`})</p>
                        </div>
                        <span className="text-[#232327] font-medium text-xs leading-[160%]">{currentStore?.storeCurrency}{parseFloat(additionalCharges?.shipping?.toFixed(2))}</span>
                    </div>

                    {/* Tax */}
                    <div className="mt-3 flex w-full justify-between items-center">
                        <div>
                            <h4 className="font-medium leading-[140%] text-base text-[#232327]">Tax</h4>
                            <p className="text-xs text-[#696969] leading-[140%] font-normal">{(additionalCharges?.tax / calculatedSubtotal) * 100}% tax</p>
                        </div>
                        <span className="text-[#232327] font-medium text-xs leading-[160%]">{currentStore?.storeCurrency}{parseFloat(additionalCharges?.tax?.toFixed(2))}</span>
                    </div>

                    {/* Divider */}
                    <div className="framer-divider bg-[#0000001A] mt-2"></div>

                    {/* Total */}
                    <div className="my-3 flex items-center justify-between w-full">
                        <h4 className="text-[#232327] font-semibold text-base leading-[140%]">Total</h4>
                        <span className="text-[#232327] font-semibold text-base leading-[140%]">
                            {currentStore?.storeCurrency}
                            {((calculatedSubtotal + additionalCharges?.shipping + additionalCharges?.tax) - additionalCharges?.discount)?.toFixed(2)}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="framer-divider bg-[#0000001A] mt-2"></div>

                    {/* Additional payment data */}
                    {
                        additionalPaymentData?.length > 0 && <div className="mt-2">
                            <h4 className="font-medium leading-[140%] text-sm text-[#232327]">Additional information</h4>
                            <div className="flex items-center flex-wrap">
                                {
                                    additionalPaymentData
                                        ?.map((data, index) => {
                                            const [key, value] = Object.entries(data as Record<string, unknown>)[0];
                                            return (
                                                <span key={index} className="text-sm ml-[2px] font-normal text-[#232327] leading-[160%]">
                                                    {key}: <span className="text-[#696969]">{String(value)}</span>
                                                    {index !== additionalPaymentData.length - 1 && ', '}
                                                </span>
                                            );
                                        })
                                }

                            </div>
                        </div>
                    }



                </div>
            </div>



            {/* Timeline */}
            <div className="w-full bg-white py-3 px-4 rounded-[4px] mt-2">
                <h3 className="text-[#232327] text-base leading-[140%} font-semibold mb-3">Timeline</h3>

                <div className="flex flex-col gap-5 relative">
                    <div className="bg-[#0000001A] w-[1px] h-[99%] absolute left-[5px]"></div>
                    {
                        timelineStatus?.slice().reverse().map((status: { message: string, updateBy: string, updateDate: string, updateTime: string }) => {
                            return (
                                <div key={`${status.updateDate}-${status.updateTime}`} className="z-20">
                                    <div className="flex items-center gap-2 ml-7">
                                        <p className="text-[#696969] font-normal text-sm leading-[160%]">{status?.updateDate}</p>
                                        <GoDotFill className="text-[10px] text-[#696969] opacity-80" />
                                        <p className="text-[#696969] font-normal text-sm leading-[160%]">{status?.updateTime}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <span className="bg-[#232327] w-3 h-3 block rounded-full flex-shrink-0 mt-[6px]"></span>
                                        <p className="text-[#232327] margin-0 text-base font-normal leading-[140%]">
                                            {`${user?.displayName === status?.updateBy ? "You" : status?.updateBy} ${status?.message}`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>




            </div>














        </div>

        {/* Bottom Bar */}
        <BottomBar />


    </div>



}

export default OrderDetails