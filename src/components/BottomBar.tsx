import { NavLink, useNavigate } from "react-router-dom"
import { LuFileText } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { MdOutlinePayment, MdOutlineSettings } from "react-icons/md";


const BottomBar = () => {

    const navigate = useNavigate();

    return (
        <nav className="w-full z-50 px-5 py-3 fixed bottom-0 bg-[#232327] text-white flex flex-col items-center justify-center">
            <ul className="p-1 flex items-center justify-between w-full">
                <li onClick={() => navigate("/", { state: { renderDocs: true } })}><NavLink className="flex items-center font-normal text-xs leading-[160%] opacity-60 flex-col cursor-pointer" to="/"> <FiHome className="text-2xl" /> Home</NavLink></li>
                <li><NavLink className="flex items-center font-normal text-xs leading-[160%] opacity-60 flex-col cursor-pointer" to="/orders"> <LuFileText className="text-2xl" /> Orders</NavLink></li>
                <li><NavLink className="flex items-center font-normal text-xs leading-[160%] opacity-60 flex-col cursor-pointer" to="/store/manage"> < MdOutlineSettings className="text-2xl" /> Settings</NavLink></li>
                <li><NavLink className="flex items-center font-normal text-xs leading-[160%] opacity-60 flex-col cursor-pointer" to="/store/payments"> < MdOutlinePayment className="text-2xl" /> Payment</NavLink></li>
            </ul>
        </nav>
    )
}

export default BottomBar