import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import instance from '../../api/fetcher';
import { EditModal } from './FormModal';
import { useNavigate } from 'react-router-dom';


export interface endRentRequest {
    id: string;
    endDate: string;
}

type Props = {
    id: string;

}

export const EndRentForm: FC<Props> = ({ id }) => {
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
                endDate: new Date().toISOString().split('T')[0]
            },
        }
    )

    const onSubmit = (data: endRentRequest) => {
        console.log(data)
        instance.patch(`/rents/${data.id}`, { endDate: data.endDate }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
        setIsOpen(false);
        navigation("/rents");
    }



    return (

        <>

            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Edit'>
                <h4 className=" text-center">Edit movie form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} type="text" disabled={true} defaultValue={id} />

                    <label>Title</label>
                    <input {...register("endDate")} type="date" />

                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>
        </>
    )
}