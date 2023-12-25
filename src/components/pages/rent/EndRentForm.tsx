import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import instance from '../../api/fetcher';
import { EditModal } from '../FormModal';



export interface endRentRequest {
    id: string;
    endDate: string;
}

type Props = {
    id: string;
    fetchRents: () => void;
}

export const EndRentForm: FC<Props> = ({ id, fetchRents }) => {
    let [isOpen, setIsOpen] = useState<boolean>(false)


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
                endDate: new Date().toISOString().split('T')[0]
            },
        }
    )

    const onSubmit = (data: endRentRequest) => {
        console.log(data)
        instance.patch(`/rents/${data.id}`, { endDate: data.endDate }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchRents();
        }, (error) => {
            console.log(error);
        }
        );
    }



    return (

        <>

            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='End Rent'>
                <h4 className=" text-center">End Rent Form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} type="text" disabled={true} defaultValue={id} />

                    <label>End Date</label>
                    <input {...register("endDate")} type="date" />

                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>
        </>
    )
}