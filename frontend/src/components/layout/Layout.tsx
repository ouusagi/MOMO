import { Outlet } from "react-router-dom"
import ScrollToTop from "../common/ScrollToTop"

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export default Layout