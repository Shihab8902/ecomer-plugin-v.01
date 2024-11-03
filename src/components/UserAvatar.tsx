import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import useStoreInfo from "../hooks/useStoreInfo";
import Avatar from 'react-avatar';
import { MdOutlineSettings } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import useOrderInfo from "../hooks/useOrderInfo";






const UserAvatar = () => {
    const { user, logOut } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const { currentStore, store, selectNewStore } = useStoreInfo();

    const { refetchOrders } = useOrderInfo({ filter: "All", currentStore: currentStore });






    const togglePopup = () => {
        setIsOpen(!isOpen);
    };



    //Refetch store items
    useEffect(() => {
        refetchOrders();
    }, [currentStore, refetchOrders])

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

            <span >
                <span className="text-center font-semibold w-ull block">Are you sure want to Logout?</span>
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
        <div className="relative">
            <div
                role="button"
                onClick={togglePopup}
                className="btn btn-ghost btn-circle avatar cursor-pointer"
            >
                <div className="w-full flex items-center gap-1 ">
                    <Avatar name={currentStore?.storeName} size="31" round="6px" color="#000" />
                </div>
            </div>


            <div
                ref={popupRef}
                className={`absolute z-50 bg-white right-0 mt-2 w-64  shadow-lg p-5 rounded-md transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                style={{ transition: "opacity 200ms ease-in-out" }}
            >


                {/* Display stores */}
                <div className=" max-h-48 overflow-auto flex flex-col gap-1">
                    {
                        store && store?.map(store => {
                            return <div onClick={() => {
                                selectNewStore(store)

                            }} key={store?._id} className={`w-full flex  justify-between items-center border ${currentStore === store && " bg-gray-100 cursor-default"}  cursor-pointer p-1 rounded `}>
                                <div className="flex items-center gap-1">
                                    <Avatar name={store?.storeName} size="24" round="5px" color="#000" />
                                    <p className="text-[#696969]">{store?.storeName}</p>
                                </div>
                                {
                                    currentStore === store && <span className="text-xl cursor-pointer" onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/store/manage");
                                    }}>
                                        <MdOutlineSettings className="text-[#232327]" />
                                    </span>
                                }
                            </div>
                        })
                    }
                </div>

                {/* New store create button */}
                <div className="mt-5">
                    <button onClick={() => navigate("/store/create")} className="flex items-center justify-center gap-2 w-full rounded-md bg-[#232327] text-white hover:bg-black"><LuPlus /> Create Store</button>
                </div>

                <div className="framer-divider bg-gray-200 my-5" />

                <div className="max-w-[150px]">
                    {user?.displayName && (
                        <p className="font-bold text-sm text-[#232327] break-words">
                            {user?.displayName}
                        </p>
                    )}
                    <p className="text-[#6E717D] text-xs break-words">{user?.email}</p>
                </div>

                <button onClick={handleLogOut} className="py-1 w-ful text-left hover:bg-transparent mt-2 text-[#232327] font-semibold rounded-md">
                    Logout
                </button>
            </div>

            <Toaster />
        </div>
    );
};

export default UserAvatar;
