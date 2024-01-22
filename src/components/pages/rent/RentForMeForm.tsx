import { FC, useState, useEffect } from 'react';
import { Movie } from "../../types/types";
import { EditModal } from '../FormModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { addRentForMeSchema, TaddRentForMeSchema } from "../../types/schemas"
import { RentRequest } from "../../types/types";
import { toast } from "react-toastify";
import usePrivateAxios from '../../../hooks/usePrivateAxios';

export const RentFormMeForm: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [movies, setMovie] = useState<Movie[]>([]);
    const instance = usePrivateAxios();

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
        if (isOpen) {
            fetchMovies();
        }
    }, [isOpen]);


    const fetchMovies = () => {
        instance.get("/movies").then((response) => {
            setMovie(response.data);
        }, (error) => {
            toast.error("Could not load movies");
            console.log(error);
        }
        );
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // getValues,
    } = useForm<TaddRentForMeSchema>(
        {
            defaultValues: {
                movieId: movies[0]?.id,
                startDate: new Date().toISOString().split('T')[0],
                endDate: "",
            },
            resolver: zodResolver(addRentForMeSchema)
        }
    )

    const onSubmit = (data: RentRequest) => {
        console.log(data)
        instance.post("/me/rent", {
            movieID: data.movieId,
            startDate: data.startDate,
            endDate: data.endDate
        }).then((response) => {
            console.log(response);
            // fetchRents();
            reset();
            setIsOpen(false);
            toast.success("Rent added");
        }, (error) => {
            toast.error(error.response.data);
        });

    }

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Rent a movie form</h4>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                    <label>Movie</label>
                    <select {...register("movieId")}>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>

                    <label>Start Date</label>
                    <input {...register("startDate")} type="date" />
                    {errors.startDate && <p className="text-red-600 text-xs">{errors.startDate.message}</p>}
                    <label>End Date (optional)</label>
                    <input {...register("endDate"
                    )} type="date" />
                    {errors.endDate && <p className="text-red-600 text-xs">{errors.endDate.message}</p>}
                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>

        </>

    )

}