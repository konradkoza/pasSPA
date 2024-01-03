import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import instance from '../../api/fetcher';
import { EditModal } from '../FormModal';
import { zodResolver } from "@hookform/resolvers/zod"
import { endRentSchema } from "../../types/schemas"
import { endRentRequest, EndRentProps } from "../../types/types"
import { toast } from "react-toastify";





export const EndRentForm: FC<EndRentProps> = ({ id, fetchRents }) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // getValues,
    } = useForm(
        {
            defaultValues: {
                id: id,
                endDate: new Date().toISOString().split('T')[0]
            },
            resolver: zodResolver(endRentSchema)
        }
    )

    const onSubmit = (data: endRentRequest) => {
        console.log(data)
        instance.patch(`/rents/${data.id}`, { endDate: data.endDate }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchRents();
            toast.success("End date added");
        }, (error) => {
            toast.error(error.response.data);
            console.log(error);
        }
        );
    }



    return (

        <>

            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='End Rent'>
                <h4 className=" text-center">End Rent Form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} type="text" disabled={true} defaultValue={id} />

                    <label>End Date</label>
                    <input {...register("endDate")} type="date" />
                    {errors.endDate && <p className="text-red-600 text-xs">{errors.endDate.message}</p>}
                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>
        </>
    )
}