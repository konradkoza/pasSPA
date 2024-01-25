import { FC } from "react";
import useUserContext from "../../../hooks/useUserContext";
import { NavLink } from "react-router-dom";
import { ChangePassword } from "./ChangePassword";

const AuthenticatedModerator: FC = () => {
    const { user } = useUserContext();

    return (
        //display user info in a pretty div 
        <>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">Your login is {user?.login}</h2>
                <h2 className="text-2xl font-bold">Your id is {user?.id}</h2>
                <h2 className="text-2xl font-bold">Your role is {user?.userType}</h2>
            </div>
            <div className='flex justify-center gap-5 items-center p-10'>
                <NavLink to={`/moderator/movies`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Manage Movies
                    </button>
                </NavLink>
                <NavLink to={`/moderator/rents`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Manage Rents
                    </button>
                </NavLink>
                <ChangePassword />
            </div>
        </>

    )

}



export default AuthenticatedModerator;