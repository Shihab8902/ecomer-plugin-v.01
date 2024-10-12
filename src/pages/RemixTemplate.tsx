import { Link, useNavigate } from "react-router-dom"
import BottomBar from "../components/BottomBar"
import UserAvatar from "../components/UserAvatar"


const RemixTemplate = () => {

    const navigate = useNavigate();



    return <main className="mb-16">
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1 px-5">
            <h3 className="text-center font-semibold text-2xl ">Remix Template</h3>
            <div>
                <UserAvatar />
            </div>
        </div>

        {/* Content */}
        <div className="w-full mt-10 flex flex-col justify-center items-center ">

            <div className="p-3 w-fit rounded-lg shadow-xl flex gap-6 flex-col">
                <img className="w-56" src="remix.png" alt="ECommerce Template Preview Screen" />
                {/* Action buttons */}
                <div className="w-full flex items-center flex-col h-full justify-end">
                    <p className="mt-3 text-center mb-4">Remix our E-commerce template <br /> to get started.</p>
                    <Link to="https://framer.com/projects/new?duplicate=y7nKoZJCd7roMdEXiGxM" target="_blank"><button onClick={() => navigate("/tutorial")} className="w-56 framer-button-primary h-8">Remix Template</button></Link>
                    <p className="mt-3 text-center text-[10px] ">Already have the template? <Link className="font-semibold hover:underline" to="/">Return to Home</Link></p>
                </div>
            </div>





        </div>


        {/* Bottom bar */}
        <BottomBar />
    </main>
}

export default RemixTemplate