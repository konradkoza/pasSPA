import { FC, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { User } from "../../types/types";
import { Rent } from "../../types/types";
// import instance from '../../api/fetcher';
import { CurrentRents } from '../rent/CurrentRents';
import { PastRents } from '../rent/PastRents';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import useUserContext from '../../../hooks/useUserContext';
import { RentFormMeForm } from '../rent/RentForMeForm';

const AllocationList: FC = () => {
    // const { id } = useParams<{ id: string }>();
    const { user } = useUserContext();
    const [pastRents, setPastRents] = useState<Rent[]>([]);
    const [currentRents, setCurrentRents] = useState<Rent[]>([]);
    const [client, setClient] = useState<User | null>(null);
    const instance = usePrivateAxios();


    useEffect(() => {
        // instance.get(`/users/${user?.id}`)
        //     .then((response) => setClient(response.data))
        //     .catch((error) => console.log(error));

        fetchCurrentRents();
        fetchPastRents();
        return (
            () => {
                setPastRents([]);
                setCurrentRents([]);
                setClient(user);
            }
        )
    }
        , []);

    const fetchCurrentRents = () => {
        instance.get(`/me/currentRents`).then((response) => {
            setCurrentRents(response.data);
        }, (error) => {
            console.log(error);
        }
        )
    }

    const fetchPastRents = () => {
        instance.get(`/me/pastRents`).then((response) => {
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
                <h1 className="self-center">Current Rents {client && "of " + client?.login}</h1>
                {currentRents.length > 0 ? (
                    <CurrentRents fetchRents={() => fetchRents()} currentRents={currentRents} />
                ) : (
                    <p>No current rents found.</p>
                )}
            </div>
            <div className="main-container">
                <h1 className="self-center" >Past Rents  {client && "of " + client?.login}</h1>
                {pastRents.length > 0 ? (
                    <PastRents pastRents={pastRents} />

                ) : (
                    <p>No past rents found.</p>
                )}
            </div>
            <div className='flex justify-center'>
                <RentFormMeForm fetchRents={() => fetchRents()} />
            </div>
        </>
    );
};

export default AllocationList;
