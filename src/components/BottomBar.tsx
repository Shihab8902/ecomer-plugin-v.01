import { Link } from "react-router-dom"
import { MdPayments } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";


const BottomBar = () => {
    return (
        <nav className="w-full z-50 h-14 fixed bottom-0 bg-[#232327] text-white flex flex-col items-center justify-center">
            <ul className="p-1 flex items-center justify-evenly w-full">
                <li><Link className="flex items-center flex-col cursor-pointer" to="/"> <IoIosHome className="text-2xl" /> Home</Link></li>
                <li><Link className="flex items-center flex-col cursor-pointer" to="/store/manage"> <IoSettingsSharp className="text-2xl" /> General</Link></li>
                <li><Link className="flex items-center flex-col cursor-pointer" to="/store/payments"> <MdPayments className="text-2xl" /> Payments</Link></li>

            </ul>
        </nav>
    )
}

export default BottomBar