import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
import { toast } from "react-toastify";
import { EditModal } from "../FormModal";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import useUserContext from "../../../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

export const ChangePassword: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const instance = usePrivateAxios();
    const [visible, setVisible] = useState(false);
    const { etagPassword, setUser } = useUserContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                password: "",
            },
        }
    )

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const onSubmit = (data: { password: string }) => {
        // console.log(p)
        instance.patch(`/me/password`, {
            password: data.password
        }, {
            headers: {
                "If-Match": etagPassword?.substring(1, etagPassword.length - 1),
            }
        }
        ).then((response) => {
            console.log(response);
            setIsOpen(false);
            toast.success("Password changed successfully");
            setUser({} as User);
            navigate("/login");
        }, (error) => {
            toast.error(error.response.data);
            console.log(error);

        }
        );
    }
    const handleVisible = () => {
        setVisible(!visible);
    }

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Change password'>
                <h4 className=" text-center">Change password</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>New password</label>
                        <input {...register("password")} className="border-2 border-gray-500 rounded-md p-2" type={visible ? "text" : "password"} placeholder="Password" />
                        <span className='flex justify-around items-center' onClick={handleVisible}>{visible ? <IoMdEyeOff size={25} className='absolute mb-16 ml-64' /> : <IoEye size={25} className='absolute mb-16 ml-64' />}</span>
                    </div>

                    {/* <label>New password</label>
                    <input {...register("password")} type="text" /> */}
                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>

        </>

    )

}