import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from "../../types/types";
import { Rent } from "../../types/types";
import instance from '../../api/fetcher';
import { CurrentRents } from '../rent/CurrentRents';
import { PastRents } from '../rent/PastRents';

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

            <div className="main-container">
                <h1 className="self-center">Current Rents {client && "of " + client.username}</h1>
                {currentRents.length > 0 ? (
                    <CurrentRents fetchRents={() => fetchRents()} currentRents={currentRents} />
                ) : (
                    <p>No current rents found.</p>
                )}
            </div>
            <div className="main-container">
                <h1 className="self-center" >Past Rents  {client && "of " + client.username}</h1>
                {pastRents.length > 0 ? (
                    <PastRents pastRents={pastRents} />

                ) : (
                    <p>No past rents found.</p>
                )}
            </div>
        </>
    );
};

export default AllocationList;
