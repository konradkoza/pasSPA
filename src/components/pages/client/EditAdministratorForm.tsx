import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EditAdministratorModeratorProps } from "../../types/types";
import { editAdministratorModeratorSchema, TeditAdministratorModeratorSchema } from "../../types/schemas"
// import instance from '../../api/fetcher';
import { EditModal } from '../FormModal';
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify";
import usePrivateAxios from '../../../hooks/usePrivateAxios';

export const EditAdministratorModeratorForm: FC<EditAdministratorModeratorProps> = ({ id, username, active, fetchUsers, role }) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)
    const instance = usePrivateAxios();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TeditAdministratorModeratorSchema>(
        {
            defaultValues: {
                id: id,
                username: username,
                active: active
            },
            resolver: zodResolver(editAdministratorModeratorSchema),
        }
    )

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const onSubmit = (data: TeditAdministratorModeratorSchema) => {
        instance.get(`/users/${data.id}`).then((response) => {
            instance.put(`/${role}/${data.id}`, {
                username: data.username,
                active: data.active
            }, {
                headers: {
                    "If-Match": response.headers.etag?.substring(1, response.headers.etag.length - 1),
                }
            }
            ).then((response) => {
                console.log(response);
                setIsOpen(false);
                fetchUsers();
                toast.success("User updated");
            }, (error) => {
                toast.error(error.response.data);
            }
            );
        }, (error) => {
            toast.error(error.response.data);
        });
        // instance.put(`/${role}/${data.id}`, {
        //     username: data.username,
        //     active: data.active
        // }).then((response) => {
        //     console.log(response);
        //     setIsOpen(false);
        //     fetchUsers();
        //     toast.success("User updated");
        // }, (error) => {
        //     toast.error(error.response.data);
        // }
        // );

    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Edit'>
                <h4 className=" text-center">Edit {role.substring(0, role.length - 1)}  form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} disabled={true} type="text" value={id} />

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