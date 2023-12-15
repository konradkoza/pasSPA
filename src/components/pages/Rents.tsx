import instance from "../api/fetcher";
import { useEffect, useState } from "react";
import { Client } from "./Clients";
import { Movie } from "./Movies";

interface Rent {
    id: string;
    user: Client;
    movie: Movie;
    startDate: Date;
    endDate: Date | null;
}

export const Rents = () => {
    const [currentRents, setCurrentRents] = useState<Rent[]>([]);
    const [pastRents, setPastRents] = useState<Rent[]>([]);


    useEffect(() => {
        instance.get("/rents/current").then((response) => {
            setCurrentRents(response.data);
        }, (error) => {
            console.log(error);
        }
        )
    }, []);

    useEffect(() => {
        instance.get("/rents/past").then((response) => {
            setPastRents(response.data);
        },
            (error) => { console.log(error) }
        );
    }, []);


    return (
        <>
            <div>
                <h1>Current Rents</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Movie</th>
                            <th>Rent Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRents.map((rent) => (
                            <tr key={rent.id}>
                                <td>{rent.user.username}</td>
                                <td>{rent.movie.title}</td>
                                <td>{rent.startDate.toString()}</td>
                                <td>{rent.endDate?.toString()}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
            <div>
                <h1>Past Rents</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Movie</th>
                            <th>Rent Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastRents.map((rent) => (
                            <tr key={rent.id}>
                                <td>{rent.user.username}</td>
                                <td>{rent.movie.title}</td>
                                <td>{rent.startDate.toString()}</td>
                                <td>{rent.endDate?.toString()}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </>
    )


}