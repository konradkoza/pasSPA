import { useNavigate } from "react-router-dom";
import useUserContext from "../../../hooks/useUserContext"
import { User } from "../../types/types";
import { FC } from "react";


const Logout: FC = () => {
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const logOut = () => {
        setUser({} as User);
        navigate("/login", { replace: true });
    }

    return (

        <>
            <button onClick={logOut} >Log out</button>
        </>
    )
}

export default Logout;