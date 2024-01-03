import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AppLayout = () => {
    return (
        <>

            <div className="flex justify-end gap-10 p-10 mx-0 my-auto" >
                <h1 className="font-bold text-lg mr-auto">Movie Rental</h1>
                <NavLink to="/clients">Clients</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/rents">Rents</NavLink>
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
            <div className="flex justify-center flex-col items-center">
                <Outlet />
            </div>

        </>
    );
};
