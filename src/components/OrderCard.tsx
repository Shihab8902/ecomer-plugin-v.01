import { RxCaretRight } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import useStoreInfo from "../hooks/useStoreInfo";
import { useNavigate } from "react-router-dom";

interface Order {
    _id: string;
    orderNumber: string;
    orderedAt: string;
    status: { message: string }[];
    paymentMethod: string;
    shipping_details: object;
    paymentStatus: string;
    products: [object];
    subtotal: number;
}

interface Store {
    storeCurrency: string;
}


const OrderCard = ({ order }: { order: Order }) => {

    const { currentStore }: { currentStore: Store } = useStoreInfo();

    const navigate = useNavigate();



    const { _id, orderNumber, shipping_details, products, orderedAt, status, paymentStatus, subtotal } = order;





    return <div onClick={() => navigate("/order/details", { state: _id })} className={`my-3 border-b pb-3 cursor-pointer`}>
        {/* Order number */}
        <div className="w-full flex items-center justify-between">
            <h4 className="text-[#232327] font-medium text-sm leading-[160%]">{orderNumber}</h4>
            <span className="text-[#23232780] text-xl"><RxCaretRight /></span>
        </div>

        {/* Details */}
        <div className="flex items-center flex-wrap gap-1">
            <p className="text-[#696969] inline text-xs font-normal leading-[160%]">{shipping_details?.name}</p>
            <GoDotFill className="text-[10px] text-[#696969] opacity-80" />
            <p className="text-[#696969] inline text-xs font-normal leading-[160%]">{products?.length} item</p>
            <GoDotFill className="text-[10px] text-[#696969] opacity-80" />
            <p className="text-[#696969] inline text-xs font-normal leading-[160%]">{orderedAt}</p>
        </div>

        {/* Status */}
        <div className="flex w-full items-center justify-between mt-[2px]">
            <div className="flex items-center gap-2">
                <div className="bg-[#FFEFAF] w-fit px-2 rounded-[4px] mt-1">
                    <span className="text-[#232327] font-normal text-sm leading-[160%]">{(status?.map(s => s.message)[status?.length - 1])?.replace("Order", "")?.trim()}</span>
                </div>
                <div className="bg-[#FFEFAF] w-fit px-2 rounded-[4px] mt-1">
                    <span className="text-[#232327] font-normal text-sm leading-[160%]">{paymentStatus}</span>
                </div>
            </div>

            <p className="text-[#232327] font-medium text-sm leading-[160%]">{currentStore?.storeCurrency}{parseFloat((subtotal / 100)?.toFixed(2))}</p>
        </div>


    </div>
}

export default OrderCard