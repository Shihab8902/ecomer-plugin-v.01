import useOrderInfo from "../hooks/useOrderInfo";
import LoaderSpinner from "./LoaderSpinner";
import useStoreInfo from "../hooks/useStoreInfo";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import OrderCard from "./OrderCard";
import { useState } from "react";




export const OrderTable = () => {

    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path d="M15.7496 16.2496L11.8519 12.3519M11.8519 12.3519C12.9068 11.2969 13.4994 9.86613 13.4994 8.37423C13.4994 6.88234 12.9068 5.45154 11.8519 4.39661C10.7969 3.34168 9.36613 2.74902 7.87423 2.74902C6.38234 2.74902 4.95154 3.34168 3.89661 4.39661C2.84168 5.45154 2.24902 6.88234 2.24902 8.37423C2.24902 9.86613 2.84168 11.2969 3.89661 12.3519C4.95154 13.4068 6.38234 13.9994 7.87423 13.9994C9.36613 13.9994 10.7969 13.4068 11.8519 12.3519Z" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


    const { currentStore } = useStoreInfo();

    const [searchValue, setSearchValue] = useState('');

    const { orders, ordersLoading } = useOrderInfo({
        currentStore: currentStore as { storeId: string },
        search: searchValue
    });



    return <div className="mb-[70px]">
        {/* Top bar */}
        <div className="fixed top-[60px] w-full z-50">
            <TopBar title="Orders" showIcon={false} />
            <div className="w-full pt-1  bg-white px-4 pb-4 ">
                <div className="p-3 bg-[#F6F6F6] flex w-full items-center rounded-md">
                    <span>{searchIcon}</span>
                    <input onChange={e => setSearchValue(e.target.value)} className="w-[90%] bg-transparent px-3 input-field caret-black focus:ring-0 placeholder:text-[#696969] placeholder:font-normal input-no-outline" type="search" name="search" id="search" placeholder="Search order" />
                </div>
            </div>
        </div>


        {/* Order content */}
        <div className="mt-[145px] mb-20 ">
            {
                ordersLoading ? <LoaderSpinner shapeWidth="40" shapeHeight="40" shapeColor="#6E717D" /> :
                    orders?.length <= 0 ? <h3 className="text-center mt-20 text-lg text-gray-500">No order found!</h3> :
                        <div className="px-5 ">
                            <div className="bg-white rounded-[4px] pt-3 pb-4 px-3">
                                <div>
                                    <h3 className="text-[#232327] font-semibold text-base leading-[140%]">Orders</h3>
                                    {
                                        orders?.map((order: {
                                            _id: string;
                                            orderNumber: string;
                                            orderedAt: string;
                                            status: { message: string }[];
                                            paymentMethod: string;
                                            shipping_details: {
                                                name: string
                                            };
                                            paymentStatus: string;
                                            products: [object];
                                            subtotal: number;
                                        }) => <OrderCard order={order} key={order?._id} />)
                                    }
                                </div>
                            </div>
                        </div>
            }
        </div>



        {/* Bottom bar */}
        <BottomBar />
    </div>
}
