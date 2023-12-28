import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from "../../types/types";
import { Rent } from "../../types/types";
import instance from '../../api/fetcher';
import { EndRentForm } from '../rent/EndRentForm';

const AllocationList = () => {
    const { id } = useParams<{ id: string }>();
    const [pastRents, setPastRents] = useState<Rent[]>([]);
    const [currentRents, setCurrentRents] = useState<Rent[]>([]);
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        instance.get(`/users/${id}`)
            .then((response) => setClient(response.data))
            .catch((error) => console.log(error));

        fetchCurrentRents();
        fetchPastRents();
        return (
            () => {
                setPastRents([]);
                setCurrentRents([]);
                setClient(null);
            }
        )
    },
        [id]);

    const fetchCurrentRents = () => {
        instance.get(`/rents/current?clientId=${id}`).then((response) => {
            setCurrentRents(response.data);
        }, (error) => {
            console.log(error);
        }
        )
    }

    const fetchPastRents = () => {
        instance.get(`/rents/past?clientId=${id}`).then((response) => {
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

            <div className="flex justify-center items-center min-w-fit w-3/4 bg-gray-200 p-4 rounded-lg flex-col">
                <h1>Current Rents {client && "of " + client.username}</h1>
                {currentRents.length > 0 ? (
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
                                    <td>{
                                        rent.endDate ? rent.endDate.toString() :
                                            <EndRentForm fetchRents={() => fetchRents()} id={rent.id} />
                                    }</td>

                                </tr>
                            ))}
                        </tbody>


                    </table>
                ) : (
                    <p>No current rents found.</p>
                )}
                <h1>Past Rents  {client && "of " + client.username}</h1>
                {pastRents.length > 0 ? (
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
                ) : (
                    <p>No past rents found.</p>
                )}
            </div>
        </>
    );
};

export default AllocationList;
