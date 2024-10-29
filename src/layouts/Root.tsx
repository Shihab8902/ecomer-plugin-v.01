import { framer } from "framer-plugin"
import { Outlet } from "react-router-dom"

framer.showUI({
    position: "top left",
    height: 600,
    width: 375,
    // maxWidth: 475,
    maxWidth: 375,
    resizable: true
})

const Root = () => {
    return <Outlet />
}

export default Root