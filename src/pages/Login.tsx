import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { framer } from "framer-plugin";


const Login = () => {

    const navigate = useNavigate();
    const { handleLoginWithGoogle } = useContext(UserContext);



    const handleLogin = () => {
        handleLoginWithGoogle()
            .then((result: object | null) => {
                if (result) {
                    framer.notify("Logged in Successfully!", {
                        durationMs: 3000,
                        variant: "success",
                    })
                    navigate("/dashboard");
                }
            })
            .catch((error: object | null) => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error",
                })
            })
    }



    return <main className={`w-full h-screen flex justify-center px-5 items-center bg-[#F1F1F1]`}>
        {/* Login with google */}
        <div className={`w-[335px] max-w-[335px] px-4 py-6 rounded-lg shadow-lg bg-white`}>
            <img className="w-12 h-12 mx-auto" src="logo.png" alt="Ecomer" />
            <h1 className="text-center text-[20px] text-[#232327] my-5 font-semibold">Welcome to eComer</h1>
            <button onClick={handleLogin} className={` bg-[#232327] hover:bg-black text-white w-full h-fit leading-[150%] text-base font-semibold mt-4 py-3 rounded-md  flex items-center justify-center gap-2 `}><span><FaGoogle className="text-base" /></span>Continue with Google</button>

            <div className="mt-5">
                <p className="text-sm font-normal text-[#696969]">
                    <span className="font-medium text-[#232327] ">Note: </span>Email us at <Link className="underline text-[#232327]" to="mailto:hello@framax.co">hello@framax.co</Link> if you are facing any issues with login.
                </p>
            </div>
        </div>


    </main>
}

export default Login