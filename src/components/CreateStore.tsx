
import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useStoreInfo from '../hooks/useStoreInfo';
import { UserContext } from '../context/AuthProvider';
import LoaderSpinner from './LoaderSpinner';
import { framer } from 'framer-plugin';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import BottomBar from './BottomBar';
import TopBar from './TopBar';

const CreateStore = () => {

    const navigate = useNavigate();

    const [isStoreCreating, setIsStoreCreating] = useState(false);
    const [location, setLocation] = useState('')

    const { refetchStore, selectNewStore } = useStoreInfo();

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
            .then((res) => {
                refetchStore();
                selectNewStore(res.data);
                framer.notify("Store Created!", {
                    durationMs: 3000,
                    variant: "success",
                })
                setIsStoreCreating(false);
                navigate("/remix");

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


    return <div className='mt-[63px] mb-[72px] flex min-h-[77vh] w-full flex-col items-center justify-center gap-5 bg-[#F1F1F1]'>
        {/* Top bar */}
        <TopBar title='Create store' showIcon={false} />

        <div className='w-full px-5'>
            <form onSubmit={handleFormSubmit} className="my-5 w-full mx-auto bg-white px-4 py-6 rounded-lg" >

                <h3 className='text-center text-xl font-semibold text-[#232327] mb-5'>Create your store</h3>
                <div>
                    <label className="block text-base text-[#232327] mb-1 font-medium" htmlFor="name">Store Name</label>
                    <input className="w-full px-3 py-[14px] rounded-md text-[#232327]  bg-[#F6F6F6] text-sm placeholder:text-[#696969]  h-12 " type="text" name="storeName" id="storeName" placeholder="Enter store name" required />
                </div>

                <div className='mt-2'>
                    <label className="block text-base text-[#232327] mb-1 font-medium" htmlFor="location">Where is the business located?</label>
                    <Select options={options} className='cursor-pointer rounded-md' value={location} onChange={(value) => setLocation(value)} />
                </div>

                <div className='mt-2'>
                    <label className="block text-base text-[#232327] mb-1 font-medium" htmlFor="name">Currency</label>
                    <input className="w-full px-3 py-[14px] rounded-md  bg-[#F6F6F6] text-sm placeholder:text-[#696969]  h-12 " type="text" name="storeCurrency" id="storeCurrency" placeholder="Enter currency" defaultValue="$" required />
                </div>

                <button type="submit" disabled={isStoreCreating} className="w-full focus:bg-[#232327] disabled:bg-[#232327] bg-[#232327] h-12 p-2 hover:bg-black text-base  rounded-md text-white flex items-center justify-center gap-2 mt-5">
                    {
                        isStoreCreating ? <><span>Creating</span> <LoaderSpinner shapeHeight='15' shapeWidth='15' shapeColor='#fff' /></> : "Create Store"
                    }

                </button>

            </form>
        </div>



        <BottomBar />

    </div>
}

export default CreateStore