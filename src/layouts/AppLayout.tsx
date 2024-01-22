import 'react-toastify/dist/ReactToastify.css';
import useUserContext from '../hooks/useUserContext';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Logout from '../components/auth/pages/Logout';
// import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
export const AppLayout = () => {
    const { user } = useUserContext();

    // useEffect(
    //     () => {
    //         console.log(user);
    //     },
    //     []

    // )

    return (

        <>
            {/* {user?.userType === "CLIENT" ?
                <ClientLayout /> :
                user?.userType === "ADMINISTRATOR" ?
                    <AdminLayout /> :
                    user?.userType === "MODERATOR" ?
                        <ModeratorLayout /> :
                        <LoginPage />} */}


            <div className="flex justify-end items-center gap-10 p-10 mx-0 my-auto" >
                <h1 className="font-bold text-lg mr-auto">Movie Rental</h1>
                {/* <NavLink to={"login"} >Test </NavLink>
                <NavLink to={"login"} >Test </NavLink> */}

                <NavLink to={`/${user?.userType.toLocaleLowerCase()}`}>
                    <p>Logged in as {user?.userType.toLocaleLowerCase()}</p>
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
