import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "../context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const { handleLoginWithGoogle } = useContext(UserContext);


    const handleLogin = () => {

        handleLoginWithGoogle()
            .then((result: object | null) => {
                if (result) {
                    toast.success("Logged in successfully!")
                    navigate("/");
                }
            })
            .catch((error: object | null) => {
                toast.error(error?.message)
            })
    }




    return <main className="w-full bg-black bg-opacity-10 h-screen flex justify-center items-center ">
        {/* Login with google */}
        <div className="bg-white w-fit px-8 py-5 rounded-lg shadow-lg shadow-[#00000027] ">
            <img className="w-8 h-8 mx-auto" src="logo.png" alt="Ecomer" />
            <h1 className="text-center text-[20px] text-[#232327] my-3 font-bold">Welcome to Ecomer</h1>
            <button onClick={handleLogin} className="w-full h-fit px-10 py-[10px] bg-[#232327] text-sm mt-4 text-white hover:bg-black flex items-center gap-2"><span><FaGoogle className="text-lg" /></span>Continue with Google</button>
        </div>

        <Toaster />
    </main>
}

export default Login