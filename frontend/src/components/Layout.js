import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <main className="App">
            <Outlet />
            Layout
        </main>
    )
}

export default Layout