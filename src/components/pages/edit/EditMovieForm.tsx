import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Movie } from '../Movies';
import instance from '../../api/fetcher';
import { EditModal } from './FormModal';
import { useNavigate } from 'react-router-dom';

export const EditMovieForm: FC<Movie> = ({ id, title, cost }) => {
    let [isOpen, setIsOpen] = useState(false)
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
                title: title,
                cost: cost
            },
        }
    )

    const onSubmit = (data: Movie) => {
        console.log(data)
        instance.put(`/movies/${data.id}`, {
            title: data.title,
            cost: data.cost
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
        setIsOpen(false);
        navigation("/movies");
    }

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h4 className=" text-center">Edit movie form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} type="text" defaultValue={id} />

                    <label>Title</label>
                    <input {...register("title")} type="text" defaultValue={title} />

                    <label>Cost</label>
                    <input {...register("cost")} type="text" defaultValue={cost} />

                    <button type="submit" className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>

        </>

    )

}