import { FC, useState } from "react"
// import usePrivateAxios from "../../../hooks/usePrivateAxios";
import { Movie } from "../../types/types";


const MoviesForClient: FC = () => {
    // const instance = usePrivateAxios();
    const [movies, setMovies] = useState<Movie[]>([]);






    return (

        <>
            <div className="main-container">
                <div className="table-container">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Cost</th>
                                <th>Id</th>
                                <th className="text-center" colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.sort((a, b) => { return a.title < b.title ? -1 : 1 }).map((movie) => (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.cost}</td>
                                    <td>{movie.id}</td>
                                    {/* <td><button onClick={() => handleDelete(movie.id)} className="btn-delete">Delete</button></td> */}
                                    {/* <td><AcceptAction action={() => handleDelete(movie.id)}></AcceptAction></td>
                                    <td><EditMovieForm {...movie} fetchMovies={() => fetchMovies()} /></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-container-mobile">
                    {movies.map((movie) => (
                        <ul className="mobile-element" key={movie.id}>
                            <li><span>Title:</span> {movie.title}</li>
                            <li><span>Cost:</span> {movie.cost}</li>
                            <li><span>Id:</span> {movie.id}</li>
                            <div className="flex justify-around mt-2">
                                {/* <li><button onClick={() => handleDelete(movie.id)} className="btn-delete">Delete</button></li> */}
                                <li>
                                    {/* <EditMovieForm {...movie} fetchMovies={() => fetchMovies()} /> */}
                                </li>

                            </div>
                        </ul>
                    ))}

                </div>
            </div>
        </>

    )
}


export default MoviesForClient;