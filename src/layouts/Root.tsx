import { framer } from "framer-plugin"
import { Outlet } from "react-router-dom"

framer.showUI({
    position: "center",
    height: 400,
    width: 600,
    resizable: true
})

const Root = () => {
    return <Outlet />
}

export default Root