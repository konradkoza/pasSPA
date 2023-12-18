import { FC, useState } from "react"
import { EditModal } from "./FormModal"
import { useForm } from "react-hook-form"
import instance from "../../api/fetcher"
import { useNavigate } from "react-router-dom"

export interface ClientRequest {
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
}

export const AddClientForm: FC = () => {

    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                username: "",
                active: false
            },
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
        }, (error) => {
            console.log(error);
        }
        );
        reset();
        setIsOpen(false);
        navigation("/clients");

    }

    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add client form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>First Name</label>
                    <input {...register("firstName")} type="text" />

                    <label>Last Name</label>
                    <input {...register("lastName")} type="text" />

                    <label>Username</label>
                    <input {...register("username")} type="text" />

                    <label>Active</label>
                    <input {...register("active")} type="checkbox" />

                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>

                </form>


            </EditModal>
        </>
    )

}