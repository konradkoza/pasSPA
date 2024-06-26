import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: FC = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const login = () => navigate("/login");
    return (

        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flex gap-3">
                    <button onClick={goBack}>Go Back</button>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </>
    )
}



export default Unauthorized;