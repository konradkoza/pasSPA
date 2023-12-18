import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Client } from '../Clients';
import instance from '../../api/fetcher';
// import { Dialog } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import { EditModal } from './FormModal';



export const EditForm: FC<Client> = ({ id, firstName, lastName, username, active }) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)


    let navigation = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        // reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                username: username,
                active: active
            },
        }
    )


    const onSubmit = (data: Client) => {
        console.log(data)
        instance.put(`/clients/${data.id}`, {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            active: data.active
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
        setIsOpen(false);
        navigation("/clients");
    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h4 className=" text-center">Edit client form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} type="text" defaultValue={id} />


                    <label>First Name</label>
                    <input  {...register("firstName")} type="text" defaultValue={firstName} />


                    <label>Last Name</label>
                    <input  {...register("lastName")} type="text" defaultValue={lastName} />


                    <label>Username</label>
                    <input {...register("username")} type="text" defaultValue={username} />


                    <label>Active</label>
                    <input {...register("active")} className=" place-self-start" type="checkbox" defaultChecked={active} />

                    <button disabled={isSubmitting} className=" col-span-2 bg-blue-500 text-white rounded p-2" type="submit">Submit</button>
                </form>

            </EditModal>

        </>
    )
}