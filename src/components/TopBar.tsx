import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar"


const TopBar = ({ title, showIcon }: { title: string, showIcon: boolean }) => {

    const navigate = useNavigate();

    const svg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M8.90278 18L3 12.5M3 12.5L8.90278 7M3 12.5L21 12.5" stroke="#232327" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


    return <div className={`flex justify-between flex-wrap fixed top-0 z-50 w-full items-center bg-[#FFFFFF] py-4 px-5`}>
        <div className="flex gap-2 items-center">
            {showIcon && <span onClick={() => navigate(-1)} className="text-2xl cursor-pointer">{svg}</span>}
            <h3 className="text-center text-[#232327] font-semibold text-lg">{title}</h3>
        </div>
        <div className="flex items-center gap-5">
            <UserAvatar />
        </div>
    </div>
}

export default TopBar