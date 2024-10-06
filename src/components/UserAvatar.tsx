import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const UserAvatar = () => {
    const { user, logOut } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleLogOut = () => {
        toast((t) => (

            <span>
                <span className="text-center font-semibold w-ull block">Are you sure want to Log0ut?</span>
                <button className="bg-[#E93725] text-white mt-3 hover:bg-[#c82a1c]" onClick={() =>
                    logOut()
                        .then(() => {
                            navigate("/")
                            toast.dismiss(t.id)
                        })
                }>
                    Confirm
                </button>
            </span>
        ), { position: "top-center" });
    }


    return (
        <div className="relative ">
            <div
                role="button"
                onClick={togglePopup}
                className="btn btn-ghost btn-circle avatar cursor-pointer"
            >
                <div className="w-10 ">
                    <img alt="User" className="rounded-full" src={user?.photoURL} />
                </div>
            </div>


            <div
                ref={popupRef}
                className={`absolute z-50  right-0 mt-2 w-64  shadow-lg p-5 rounded-md transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                style={{ transition: "opacity 200ms ease-in-out" }}
            >
                <div className="flex items-center gap-3">
                    <img
                        src={user?.photoURL}
                        className="w-10 h-10 rounded-full"
                        alt="User"
                    />
                    <div className="max-w-[150px]">
                        {user?.displayName && (
                            <p className="font-bold text-sm  break-words">
                                Name: {user?.displayName}
                            </p>
                        )}
                        <p className="text-[#6E717D] text-xs break-words">{user?.email}</p>
                    </div>
                </div>

                <button onClick={handleLogOut} className="py-1 w-full mt-4 font-semibold text-white bg-[#E93725] hover:bg-[#c82a1c] rounded-md">
                    Logout
                </button>
            </div>

            <Toaster />
        </div>
    );
};

export default UserAvatar;
