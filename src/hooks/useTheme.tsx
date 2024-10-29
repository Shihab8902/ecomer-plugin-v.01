import { useEffect, useState } from "react";


const useTheme = () => {



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
        }, 100) // Update every 100ms

        return () => {
            clearInterval(pollingInterval)
        }
    }, [])


    return { theme, setTheme };
}

export default useTheme