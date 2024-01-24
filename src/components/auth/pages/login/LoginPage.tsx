import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import instance from "../../../api/fetcher";
import axios, { AxiosError } from "axios";
import useUserContext from "../../../../hooks/useUserContext";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

interface UserLogin {
    login: string;
    password: string;
}

const LoginPage: FC = () => {
    const { setUser, setEtagPassword } = useUserContext();
    // const location = useLocation();
    const navigate = useNavigate();
    // const from = `/${user?.userType.toLocaleLowerCase()}` || "/";
    const {
        register,
        handleSubmit,
        // formState: { errors, isSubmitting },
        // reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                login: "",
                password: "",
            },
        }
    )

    const onSubmit = async (data: UserLogin) => {
        // console.log(data)
        try {
            const response = await instance.post("/authentication/login", data);
            console.log(response);
            console.log("Etag");
            console.log(response.headers.etag);
            setUser(response.data);
            setEtagPassword(response.headers.etag);
            // console.log(response.headers['Etag']);
            navigate(`/${response.data.userType.toLocaleLowerCase()}`);
            // console.log(response.data);
            console.log(response);
        } catch (error) {

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                toast.error(axiosError.response?.data as string);
                console.log(axiosError.response?.data);
            } else {
                console.log(error);
            }
        }
    }


    return (

        <>
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
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Movie Rental</h1>
                <h2 className="text-2xl font-bold">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-5">
                    <input {...register("login")}
                        className="border-2 border-gray-500 rounded-md p-2" type="text" placeholder="Username" />
                    <input {...register("password")} className="border-2 border-gray-500 rounded-md p-2" type="password" placeholder="Password" />
                    <button className="border-2 border-gray-500 rounded-md p-2" type="submit">Login</button>
                </form>
                <div className="p-2 flex flex-col items-center">
                    <p>Don't have an account?</p>
                    <NavLink className="text-blue-700" to="/register">Register</NavLink>

                </div>

            </div>
        </>

    )

}


export default LoginPage;