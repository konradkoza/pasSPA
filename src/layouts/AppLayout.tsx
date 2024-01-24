import 'react-toastify/dist/ReactToastify.css';
import useUserContext from '../hooks/useUserContext';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Logout from '../components/auth/pages/Logout';

import { NavLink, Navigate } from 'react-router-dom';
export const AppLayout = () => {
    const { user } = useUserContext();


    return (

        <>
            {user ? null : <Navigate to="/login" replace />}


            <div className="flex justify-end items-center gap-10 p-10 mx-0 my-auto" >
                <h1 className="font-bold text-lg mr-auto">Movie Rental</h1>
                <NavLink to={`/${user?.userType.toLocaleLowerCase()}`}>
                    <p>{user?.userType.toLocaleLowerCase()} panel</p>
                </NavLink>


                <Logout />

            </div >
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


        </>
    );
};
