import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { MdStorefront } from "react-icons/md";


const TopBar = ({ title, showIcon, alternativeAvatar }: { title: string, showIcon: boolean, alternativeAvatar: boolean }) => {


    const navigate = useNavigate();


    return <div className={`flex justify-between flex-wrap fixed top-0 z-50 w-full items-center bg-[#FFFFFF] py-4 px-5`}>
        <div className="flex gap-2 items-center">
            {showIcon && <span onClick={() => navigate(-1)} className="text-2xl cursor-pointer"><HiOutlineArrowLeft /></span>}
            <h3 className="text-center text-[#232327] font-semibold text-lg">{title}</h3>
        </div>
        <div className="flex items-center gap-5">
            {
                alternativeAvatar ? <div className="w-[31px] h-[31px] bg-[#000] rounded-md flex justify-center items-center ">

                    <MdStorefront className="text-white text-base" />

                </div>
                    : <UserAvatar />
            }
        </div>
    </div>
}

export default TopBar