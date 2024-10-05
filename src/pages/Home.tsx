import { useContext } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { UserContext } from "../context/AuthProvider";


const Home = () => {

    const { user } = useContext(UserContext);


    return <>
        {
            user ? <Dashboard /> : <Login />
        }
    </>
}

export default Home