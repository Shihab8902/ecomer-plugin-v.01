import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { framer } from "framer-plugin";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useGetDataPublic from "../hooks/useGetPublic";
import LoaderSpinner from "../components/LoaderSpinner";




const OrderDetails = () => {
    const { state: reqId } = useLocation();
    const { user } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();


    //Fetch order data
    const { data: orderData, refetch: refetchOrders, isLoading } = useGetDataPublic([reqId, "order"], `/order?id=${reqId}`)

    const { _id, orderNumber, shipping_details, billing_details, status, exp_deliver } = orderData || {};


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
                    await setTimelineStatus(`Marked the delivery status as "${status}"`);
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
                    await setTimelineStatus(exp_deliver === "unknown" ? "Assigned an expected delivery date for this order" : "Updated the expected delivery date for this order")
                    refetchOrders();
                    framer.notify("Expected delivery date updated!", {
                        variant: "success",
                        durationMs: 3000
                    })

                }
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
                        <select onChange={handleOrderStatusUpdate} defaultValue={status?.map((status: { message: string, date: string }) => status?.message)[status?.length - 1]} className="bg-[#FFEFAF] px-2 rounded-[4px] h-[30px] cursor-pointer text-sm font-normal text-[#232327]" name="" id="">
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
                        <input onChange={handleExpDeliveryUpdate} className="absolute bottom-[3px] right-[4px] w-full h-full opacity-0 cursor-pointer " type="date" />
                    </div>


                </div>

            </div>






        </div>

        {/* Bottom Bar */}
        <BottomBar />

        <Toaster />
    </div>



}

export default OrderDetails