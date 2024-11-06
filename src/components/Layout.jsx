import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';

const Layout = ({contacts}) => {
    return <>
    <div className="container">
    <Sidebar contacts={contacts}/>
    <Outlet />
    </div>
    </>
}

export default Layout;