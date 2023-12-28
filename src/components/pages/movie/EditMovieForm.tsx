import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Movie } from "../../types/types";
import instance from '../../api/fetcher';
import { EditModal } from '../FormModal';
import { zodResolver } from "@hookform/resolvers/zod"
import { EditMovieProps } from "../../types/types";
import { editMovieSchema, TeditMovieSchema } from "../../types/schemas"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const EditMovieForm: FC<EditMovieProps> = ({ id, title, cost, fetchMovies }) => {
    let [isOpen, setIsOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TeditMovieSchema>(
        {
            defaultValues: {
                id: id,
                title: title,
                cost: cost
            },
            resolver: zodResolver(editMovieSchema)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const onSubmit = (data: Movie) => {
        console.log(data)
        instance.put(`/movies/${data.id}`, {
            title: data.title,
            cost: data.cost
        }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchMovies();
            toast.success("Movie updated");
        }, (error) => {
            toast.error(error.response.data);
            console.log(error);

        }
        );
    }

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Edit'>
                <h4 className=" text-center">Edit movie form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Id</label>
                    <input {...register("id")} disabled type="text" defaultValue={id} />

                    <label>Title</label>
                    <input {...register("title")} type="text" defaultValue={title} />
                    {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}
                    <label>Cost</label>
                    <input {...register("cost",
                        {
                            valueAsNumber: true

                        })} type="number" />
                    {errors.cost && <p className="text-red-600 text-xs">{errors.cost.message}</p>}
                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>

        </>

    )

}