import { FC, useState } from "react"
import { EditModal } from "../FormModal"
import { useForm } from "react-hook-form"
import usePrivateAxios from "../../../hooks/usePrivateAxios"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdministratorRequest, ModeratorRequest } from "../../types/types";
import { addAdministratorModeratorSchema, TaddAdministratorModeratorSchema } from "../../types/schemas"
import { toast } from "react-toastify";

export interface Props {
    fetchUsers: () => void;
    role: "administrators" | "moderators"
}

export const AddAdministratorModeratorForm: FC<Props> = ({ fetchUsers, role }) => {
    const instance = usePrivateAxios();
    const [isOpen, setIsOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TaddAdministratorModeratorSchema>(
        {
            defaultValues: {
                username: "",
                active: false,
                password: "",

            },
            resolver: zodResolver(addAdministratorModeratorSchema)
        }

    )

    const onSubmit = (data: AdministratorRequest | ModeratorRequest) => {
        instance.post(`/${role}`, {
            username: data.username,
            active: data.active,
            password: data.password
        }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchUsers();
            toast.success("User added");
            reset();
        }, (error) => {
            toast.error(error.response.data);

        }
        );



    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add {role.substring(0, role.length - 1)} form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="username">Username</label>
                    <input {...register("username")} id="username" required type="text" />
                    {errors.username && (
                        <p className="text-red-600">{`${errors.username.message}`}</p>
                    )}
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} id="password" required type="password" />
                    {errors.password && (
                        <p className="text-red-600">{`${errors.password.message}`}</p>
                    )}
                    <div>
                        <input {...register("active")} className="" id="active" type="checkbox" />
                        <label htmlFor="active">Active</label>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>

                </form>


            </EditModal>
        </>
    )

}