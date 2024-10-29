import { useContext } from "react";
import Login from "./Login";
import { UserContext } from "../context/AuthProvider";
import Tutorial from "./Tutorial";


const Home = () => {

    const { user } = useContext(UserContext);


    return <>
        {
            user ? <Tutorial /> : <Login />
        }
    </>
}

export default Home