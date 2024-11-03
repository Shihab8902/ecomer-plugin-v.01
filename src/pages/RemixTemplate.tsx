import { Link, useNavigate } from "react-router-dom"
import TopBar from "../components/TopBar";



const RemixTemplate = () => {

    const navigate = useNavigate();

    return <main >
        {/* Top bar */}
        <TopBar title="Remix Template" showIcon={false} alternativeAvatar={false} />

        <div className="px-5 pb-3  mt-20  flex min-h-[77vh] w-full justify-center items-center flex-col gap-5 ">
            <div className="px-5 py-6 bg-white w-full rounded-lg">
                <h3 className="text-[#232327] text-base font-semibold mb-5">Remix our E-commerce template to get started</h3>
                <div className="bg-[#F6F6F6] rounded-[4px] p-3 pb-0">
                    <div className="h-[324px] w-full bg-white border-t border-l border-r border-[#EAEAEA] rounded-t-[4px] ">
                        <img className="w-full h-full rounded-t-[4px]" src="remix.png" alt="Template Preview" />
                    </div>
                </div>
                <Link to="https://framer.com/projects/new?duplicate=y7nKoZJCd7roMdEXiGxM" target="_blank">  <button onClick={() => navigate("/")} className="mt-5 rounded-md w-full hover:bg-black bg-[#232327] text-white font-semibold text-base h-12">Remix Template</button></Link>
                <p className="text-[#696969] mt-3 text-sm">Already have the template? <Link className="font-medium text-[#232327] hover:underline" to="/">Return to home</Link></p>
            </div>
        </div>


    </main>
}

export default RemixTemplate