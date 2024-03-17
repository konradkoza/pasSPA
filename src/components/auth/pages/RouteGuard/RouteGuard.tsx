import { FC, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../../../../hooks/useUserContext";


interface role {
    clientType: "ADMINISTRATOR" | "CLIENT" | "MODERATOR",
}

const RouteGuard: FC<role> = ({ clientType }) => {
    const { user } = useUserContext();

    useEffect(
        () => {
            console.log(user);
        },
        []
    )

    return (

        <>
            {
                user?.userType === clientType ? <Outlet /> :
                    user ? <Navigate to={"login"} />
                        : <Navigate to={"unauthorized"} />}

        </>
    )
}


export default RouteGuard;

