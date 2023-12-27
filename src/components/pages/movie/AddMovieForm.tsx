import { FC, useState } from "react";
import { EditModal } from "../FormModal";
import { useForm } from "react-hook-form";
import instance from "../../api/fetcher";
import { zodResolver } from "@hookform/resolvers/zod"
import { MovieRequest } from "../../types/types";
import { movieSchema, TmovieSchema } from "../../types/schemas"


export const AddMovieForm: FC<{ fetchMovies: () => void }> = ({ fetchMovies }) => {
    const [isOpen, setIsOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TmovieSchema>(
        {
            defaultValues: {
                title: "",
                cost: 0
            },
            resolver: zodResolver(movieSchema)
        }
    )

    const onSubmit = (data: MovieRequest) => {
        instance.post("/movies", {
            title: data.title,
            cost: data.cost
        }).then((response) => {
            console.log(response);
            setIsOpen(false);
            fetchMovies();
        }, (error) => {
            console.log(error);
        }
        );
        reset();


    }


    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add movie form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Title</label>
                    <input {...register("title")} type="text" />
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