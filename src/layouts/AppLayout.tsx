import { NavLink, Outlet } from "react-router-dom";

export const AppLayout = () => {
    return (
        <>

            <div className="flex justify-end gap-10 p-10 mx-0 my-auto" >
                <h1 className="font-bold text-lg mr-auto">Movie Rental</h1>
                <NavLink to="/clients">Clients</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/rents">Rents</NavLink>
            </div>
            <div className="flex justify-center flex-col items-center">
                <Outlet />
            </div>

        </>
    );
};
