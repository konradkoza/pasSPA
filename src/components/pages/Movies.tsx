import instance from "../api/fetcher";
import { useEffect, useState } from "react";
import { EditMovieForm } from "./edit/EditMovieForm";
import { AddMovieForm } from "./edit/AddMovieForm";

export interface Movie {
    id: string;
    title: string;
    cost: string;
}



export const Movies = () => {
    const [movies, setMovie] = useState<Movie[]>([]);

    useEffect(() => {
        instance.get("/movies").then((response) => {
            setMovie(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }, []);

    const handleDelete = (id: string) => {
        instance.delete(`/movies/${id}`).then((response) => {
            console.log(response);
        }, (error) => {
            alert(error.response.data.message)
            console.log(error);
        }
        );
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Cost</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.cost}</td>
                                <td>{movie.id}</td>
                                <td><button onClick={() => handleDelete(movie.id)} className="col-span-2 bg-blue-500 text-white rounded p-2 w-32">Delete</button></td>
                                <td><EditMovieForm {...movie} /></td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                <div className="flex justify-center">
                    <AddMovieForm />
                </div>

            </div>
        </>
    )
}