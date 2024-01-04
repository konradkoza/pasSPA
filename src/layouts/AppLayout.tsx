import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AppLayout = () => {
    return (
        <div>

            <div className="flex justify-end items-center gap-10 p-10 mx-0 my-auto" >
                <h1 className="font-bold text-lg mr-auto">Movie Rental</h1>
                <NavLink className={({ isActive }) => isActive ? "active-navlink" : undefined} to="/clients" end>Clients</NavLink>
                <NavLink className={({ isActive }) => isActive ? "active-navlink" : undefined} to="/movies">Movies</NavLink>
                <NavLink className={({ isActive }) => isActive ? "active-navlink" : undefined} to="/rents">Rents</NavLink>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Outlet />

        </div>
    );
};
