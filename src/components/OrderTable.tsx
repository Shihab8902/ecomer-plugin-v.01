import useOrderInfo from "../hooks/useOrderInfo";
import UserAvatar from "./UserAvatar";


export const OrderTable = () => {

    const { orders, refetchOrders, ordersLoading } = useOrderInfo();


    return <div>
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1">
            <h3 className="text-center font-semibold text-2xl ">Manage Orders</h3>
            <div>
                <UserAvatar />
            </div>
        </div>












    </div>
}
