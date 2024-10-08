import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { framer } from "framer-plugin";

const Login = () => {

    const navigate = useNavigate();


    const { handleLoginWithGoogle } = useContext(UserContext);

    const [theme, setTheme] = useState<string | undefined>("");

    //Get current theme
    useEffect(() => {
        const updateSubtotalFromStorage = () => {
            const currentTheme = document.body.dataset.framerTheme;
            setTheme(currentTheme)
        }


        updateSubtotalFromStorage()

        const pollingInterval = setInterval(() => {
            updateSubtotalFromStorage()
        }, 100) // Update every 500ms

        return () => {
            clearInterval(pollingInterval)
        }
    }, [])


    const handleLogin = () => {
        handleLoginWithGoogle()
            .then((result: object | null) => {
                if (result) {
                    framer.notify("Logged in Successfully!", {
                        durationMs: 3000,
                        variant: "success",
                    })
                    navigate("/");
                }
            })
            .catch((error: object | null) => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error",
                })
            })
    }



    return <main className="w-full  h-screen flex justify-center items-center ">
        {/* Login with google */}
        <div className={`w-fit px-8 py-5 rounded-lg shadow-lg ${theme === "dark" ? "bg-black" : "bg-white"} shadow-[#00000027]`}>
            <img className="w-8 h-8 mx-auto" src="logo.png" alt="Ecomer" />
            <h1 className="text-center text-[20px]  my-3 font-bold">Welcome to Ecomer</h1>
            <button onClick={handleLogin} className="w-full h-fit px-10 py-[10px] bg-[#232327] text-sm mt-4 text-white hover:bg-black flex items-center gap-2"><span><FaGoogle className="text-lg" /></span>Continue with Google</button>
        </div>


    </main>
}

export default Login