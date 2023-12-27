import instance from "../../api/fetcher";
import { useEffect, useState } from "react";
import { Rent } from "../../types/types";
import { EndRentForm } from "./EndRentForm";
import { AddRentForm } from "./AddRentForm";



export const Rents = () => {
    const [currentRents, setCurrentRents] = useState<Rent[]>([]);
    const [pastRents, setPastRents] = useState<Rent[]>([]);



    useEffect(() => {
        fetchCurrentRents();
    }, []);

    useEffect(() => {
        fetchPastRents();
    }, []);

    const fetchCurrentRents = () => {
        instance.get("/rents/current").then((response) => {
            setCurrentRents(response.data);
        }, (error) => {
            console.log(error);
        }
        )
    }

    const fetchPastRents = () => {
        instance.get("/rents/past").then((response) => {
            setPastRents(response.data);
        }, (error) => {
            console.log(error);
        }
        )
    }

    const fetchRents = () => {
        fetchCurrentRents();
        fetchPastRents();
    }


    return (
        <>
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg flex-col my-2" >
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
                                {/* <td>{rent.endDate?.toString()}</td> */}
                                <td>{
                                    rent.endDate ? rent.endDate.toString() :
                                        <EndRentForm fetchRents={() => fetchRents()} id={rent.id} />
                                }</td>

                            </tr>
                        ))}
                    </tbody>


                </table>

            </div>
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg flex-col my-2">
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
            <div className="flex justify-center">
                <AddRentForm fetchRents={() => fetchRents()} />
            </div>

        </>
    )


}