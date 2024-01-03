import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Client, EditClientProps } from "../../types/types";
import { editClientSchema, TeditClientSchema } from "../../types/schemas"
import instance from '../../api/fetcher';
import { EditModal } from '../FormModal';
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify";



export const EditClientForm: FC<EditClientProps> = ({ id, firstName, lastName, username, active, fetchClients }) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TeditClientSchema>(
        {
            defaultValues: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                username: username,
                active: active
            },
            resolver: zodResolver(editClientSchema),
        }
    )

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const onSubmit = (data: Client) => {
        console.log(data)
        instance.put(`/clients/${data.id}`, {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            active: data.active
        }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchClients();
            toast.success("Client updated");
        }, (error) => {
            toast.error(error.response.data);
        }
        );

    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Edit'>
                <h4 className=" text-center">Edit client form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} disabled={true} type="text" value={id} />


                    <label>First Name</label>
                    <input  {...register("firstName")} required type="text" defaultValue={firstName} />
                    {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}

                    <label>Last Name</label>
                    <input  {...register("lastName")} required type="text" defaultValue={lastName} />
                    {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}

                    <label>Username</label>
                    <input {...register("username")} required type="text" defaultValue={username} />
                    {errors.username && <p className="text-red-600">{errors.username.message}</p>}

                    <div>
                        <input {...register("active")} className=" place-self-start" type="checkbox" defaultChecked={active} />
                        <label>Active</label>
                    </div>
                    <button disabled={isSubmitting} className=" col-span-2 bg-blue-500 text-white rounded p-2" type="submit">Submit</button>
                </form>

            </EditModal>

        </>
    )
}