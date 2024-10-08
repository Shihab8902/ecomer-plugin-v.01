
import { useContext, useMemo, useState } from 'react';
import UserAvatar from './UserAvatar'
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useStoreInfo from '../hooks/useStoreInfo';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from './LoaderSpinner';
import { framer } from 'framer-plugin';
import Select from 'react-select'
import countryList from 'react-select-country-list'

const CreateStore = () => {

    const navigate = useNavigate();

    const [isStoreCreating, setIsStoreCreating] = useState(false);
    const [location, setLocation] = useState('')

    const { refetchStore } = useStoreInfo();

    const { user } = useContext(UserContext)
    const axiosPublic = useAxiosPublic();


    //Handle store creation
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsStoreCreating(true)
        const storeName = e.target?.storeName?.value;
        const storeData = {
            storeName,
            location,
            admin: user.email
        }
        if (!location) {
            setIsStoreCreating(false);
            return framer.notify("Business location is required.", {
                durationMs: 3000,
                variant: "warning"
            });
        }
        axiosPublic.post("/store", storeData)
            .then(() => {
                refetchStore();
                framer.notify("Store Created!", {
                    durationMs: 3000,
                    variant: "success",
                })
                setIsStoreCreating(false);
                navigate("/")

            }).catch(error => {
                framer.notify(error.message, {
                    durationMs: 3000,
                    variant: "error",
                })
                setIsStoreCreating(false);
            })

    }

    //Country selection
    const options = useMemo(() => countryList().getData(), [])


    return <div className='px-5'>
        {/* Top bar */}
        <div className="flex w-full justify-between items-center border-b pb-1">
            <h3 className="text-center font-semibold text-2xl ">Create Store</h3>
            <div>
                <UserAvatar />
            </div>
        </div>

        <form onSubmit={handleFormSubmit} className="my-5 max-w-80 mx-auto border p-5 rounded-lg" >
            <div>
                <label className="block text-sm mb-1 font-medium" htmlFor="name">Store Name</label>
                <input className="w-full p-3 rounded-md  h-10 " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
            </div>

            <div className='mt-3'>
                <label className="block text-sm mb-1 font-medium" htmlFor="location">Where is the business located?</label>
                <Select options={options} className='cursor-pointer rounded-md' value={location} onChange={(value) => setLocation(value)} />
            </div>



            <button type="submit" disabled={isStoreCreating} className="w-full focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] h-10 p-2 hover:bg-black text-white flex items-center justify-center gap-2 mt-5">
                {
                    isStoreCreating ? <><span>Creating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Create"
                }

            </button>

        </form>

        <Toaster />



    </div>
}

export default CreateStore