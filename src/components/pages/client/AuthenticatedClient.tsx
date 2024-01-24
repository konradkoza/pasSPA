import { FC } from "react";
import useUserContext from "../../../hooks/useUserContext";
import { RentFormMeForm } from "../rent/RentForMeForm";
import { ChangePassword } from "./ChangePassword";
// import AllocationList from "./AllocationList";
// import { NavLink } from 'react-router-dom';
import AllocationList from "./AllocationList";
const AuthenticatedClient: FC = () => {
    const { user } = useUserContext();

    return (
        //display user info in a pretty div 
        <>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold">Welcome {user?.firstName} {user?.lastName}</h2>
                <h2 className="text-2xl font-bold">Your login is {user?.login}</h2>
                <h2 className="text-2xl font-bold">Your id is {user?.id}</h2>
            </div>

            <div className='flex justify-center gap-5 items-center p-10'>
                <ChangePassword />
                {/* <AllocationList /> */}
            </div>
            <AllocationList />
        </>



    )

}

export default AuthenticatedClient;