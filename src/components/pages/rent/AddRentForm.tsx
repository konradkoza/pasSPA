import { FC, useState, useEffect } from 'react';
import { Movie } from '../movie/Movies';
import instance from '../../api/fetcher';
import { Client } from '../client/Clients';
import { EditModal } from '../FormModal';
import { useForm } from 'react-hook-form';

interface Props {
    fetchRents: () => void;
}

interface RentRequest {
    client: Client;
    movie: Movie;
    startDate: string;
    endDate: string;
}


export const AddRentForm: FC<Props> = ({ fetchRents }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [clients, setClients] = useState<Client[]>([]);
    const [movies, setMovie] = useState<Movie[]>([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {

        fetchClients();

    }, []);

    const fetchMovies = () => {
        instance.get("/movies").then((response) => {
            setMovie(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }

    const fetchClients = () => {
        instance.get("/clients").then((response) => {
            setClients(response.data.filter((client: Client) => client.active));
        }, (error) => {
            console.log(error);
        }
        );
    }

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        // reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                client: clients[0],
                movie: movies[0],
                startDate: new Date().toISOString().split('T')[0],
                endDate: ""
            },
        }
    )

    const onSubmit = (data: RentRequest) => {
        console.log(data)
        instance.post("/rents", {
            clientID: data.client,
            movieID: data.movie,
            startDate: data.startDate,
            endDate: data.endDate
        }).then((response) => {
            console.log(response);
            fetchRents();
            setIsOpen(false);
        }, (error) => {
            console.log(error);
        });

    }

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add rent form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>


                    <label>Client</label>
                    <select {...register("client")}>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.username}
                            </option>
                        ))}
                    </select>

                    <label>Movie</label>
                    <select {...register("movie")}>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>


                    <label>Start Date</label>
                    <input {...register("startDate")} type="date" />

                    <label>End Date (optional)</label>
                    <input {...register("endDate")} type="date" />

                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>

        </>

    )

}