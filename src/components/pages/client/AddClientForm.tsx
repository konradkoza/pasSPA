import { FC, useState } from "react"
import { EditModal } from "../FormModal"
import { useForm } from "react-hook-form"
import instance from "../../api/fetcher"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientRequest } from "../../types/types";
import { addClientSchema, TaddClientSchema } from "../../types/schemas"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const AddClientForm: FC<{ fetchClients: () => void }> = ({ fetchClients }) => {

    const [isOpen, setIsOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TaddClientSchema>(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                username: "",
                active: false
            },
            resolver: zodResolver(addClientSchema)
        }

    )

    const onSubmit = (data: ClientRequest) => {
        instance.post("/clients", {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            active: data.active
        }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchClients();
            toast.success("Client added");
            reset();
        }, (error) => {
            toast.error(error.response.data);

        }
        );



    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add client form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName")} required id="firstName" type="text" />
                    {errors.firstName && (
                        <p className="text-red-600">{`${errors.firstName.message}`}</p>
                    )}
                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName")} id="lastNamex`" required type="text" />
                    {errors.lastName && (
                        <p className="text-red-600">{`${errors.lastName.message}`}</p>
                    )}
                    <label htmlFor="username">Username</label>
                    <input {...register("username")} id="username" required type="text" />
                    {errors.username && (
                        <p className="text-red-600">{`${errors.username.message}`}</p>
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