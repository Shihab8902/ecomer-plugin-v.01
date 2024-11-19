import { useContext } from "react";
import Login from "./Login";
import { UserContext } from "../context/AuthProvider";
import Tutorial from "./Tutorial";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";


const Home = () => {

    const { user } = useContext(UserContext) || {};

    const location = useLocation();


    if (location?.state?.renderDocs) {
        return <Tutorial />;
    }

    return (
        <>
            {user ? <Dashboard /> : <Login />}
        </>
    );
}

export default Home