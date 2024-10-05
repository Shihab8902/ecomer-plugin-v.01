import { createContext, ReactNode, useEffect, useState } from "react"

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import auth from "../firebase/firebase.config";


interface AuthContextType {
    user: object | null;
    loading: boolean;
    handleLoginWithGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

export const UserContext = createContext(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    //States
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(false);


    //Login with google

    const provider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    //Logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    //Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
            setLoading(false);
        });


        return () => {
            return unsubscribe();
        }
    });


    const authInfo: AuthContextType = {
        user,
        loading,
        handleLoginWithGoogle,
        logOut
    }


    return <UserContext.Provider value={authInfo}>
        {children}
    </UserContext.Provider>


}

export default AuthProvider