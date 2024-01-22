import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import instance from '../../../api/fetcher';
import { RegisterClient } from '../../../types/types';
import axios, { AxiosError } from 'axios';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
const RegisterPage: FC = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // formState: { errors, isSubmitting },
        // reset,
        // getValues,

    } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                username: "",
                password: "",

            },
        }

    )

    const onSubmit = async (data: RegisterClient) => {

        try {
            const response = await instance.post("/clients", {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                password: data.password,
                active: true,
            })
            console.log(response);
            navigate("/login", { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.log(axiosError.response?.data);
            } else {
                console.log(error);
            }
        }

    }

    const handleVisible = () => {
        setVisible(!visible);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Movie Rental</h1>
                <h2 className="text-2xl font-bold">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-5">
                    <input {...register("firstName")}
                        className="border-2 border-gray-500 rounded-md p-2" type="text" placeholder="First Name" />
                    <input {...register("lastName")}
                        className="border-2 border-gray-500 rounded-md p-2" type="text" placeholder="Last Name" />
                    <input {...register("username")}
                        className="border-2 border-gray-500 rounded-md p-2" type="text" placeholder="Username" />


                    <div>
                        <input {...register("password")} className="border-2 border-gray-500 rounded-md p-2" type={visible ? "text" : "password"} placeholder="Password" />
                        <span className='flex justify-around items-center' onClick={handleVisible}>{visible ? <IoMdEyeOff size={25} className='absolute mb-16 ml-64' /> : <IoEye size={25} className='absolute mb-16 ml-64' />}</span>
                    </div>




                    <button className="border-2 border-gray-500 rounded-md p-2" type="submit">Register</button>
                </form>
                <div className="p-2 flex flex-col items-center">
                    <p>Back to login</p>
                    <NavLink className="text-blue-700" to="/login">Login</NavLink>

                </div>

            </div>


        </>
    )

}


export default RegisterPage;