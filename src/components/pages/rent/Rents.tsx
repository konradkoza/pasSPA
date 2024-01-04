import instance from "../../api/fetcher";
import { useEffect, useState } from "react";
import { Rent } from "../../types/types";
import { EndRentForm } from "./EndRentForm";
import { AddRentForm } from "./AddRentForm";
import { toast } from "react-toastify";


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
            toast.error("Could not load current rents");
            console.log(error);
        }
        )
    }

    const fetchPastRents = () => {
        instance.get("/rents/past").then((response) => {
            setPastRents(response.data);
        }, (error) => {
            toast.error("Could not load past rents");
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
            <div className="main-container" >
                <h1 className="self-center">Current Rents</h1>
                <div className="overflow-auto justify-center hidden md:flex">
                    <table className="w-fit">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Movie</th>
                                <th>Rent Id</th>
                                <th>Rent Date</th>
                                <th>Return Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRents.map((rent) => (
                                <tr key={rent.id}>
                                    <td>{rent.user.username}</td>
                                    <td>{rent.movie.title}</td>
                                    <td>{rent.id}</td>
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
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {currentRents.map((rent) => (
                        <ul className="bg-gray-50 p-5 rounded-lg shadow" key={rent.id}>
                            <li><span>Title:</span> {rent.user.username}</li>
                            <li><span>Cost:</span> {rent.movie.title}</li>
                            <li><span>Id:</span> {rent.id}</li>
                            <li><span>Start date:</span> {rent.startDate}</li>
                            <li><span>End date:</span> {
                                rent.endDate ? rent.endDate.toString() :
                                    <EndRentForm fetchRents={() => fetchRents()} id={rent.id} />
                            }</li>
                        </ul>
                    ))}

                </div>

            </div>
            <div className="main-container">
                <h1 className="self-center">Past Rents</h1>
                <div className="overflow-auto justify-center hidden md:flex">
                    <table className="w-fit">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Movie</th>
                                <th>Rent Id</th>
                                <th>Rent Date</th>
                                <th>Return Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastRents.map((rent) => (
                                <tr key={rent.id}>
                                    <td>{rent.user.username}</td>
                                    <td>{rent.movie.title}</td>
                                    <td>{rent.id}</td>
                                    <td>{rent.startDate.toString()}</td>
                                    <td>{rent.endDate?.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {currentRents.map((rent) => (
                        <ul className="bg-gray-50 p-5 rounded-lg shadow" key={rent.id}>
                            <li><span>Title:</span> {rent.user.username}</li>
                            <li><span>Cost:</span> {rent.movie.title}</li>
                            <li><span>Id:</span> {rent.id}</li>
                            <li><span>Start date:</span> {rent.startDate}</li>
                            <li><span>End date:</span> {rent.endDate?.toString()}</li>
                        </ul>
                    ))}

                </div>

            </div>




            <div className="flex justify-center p-5">
                <AddRentForm fetchRents={() => fetchRents()} />
            </div>

        </>
    )


}