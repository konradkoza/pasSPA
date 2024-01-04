import instance from "../../api/fetcher";
import { useEffect, useState } from "react";
import { Rent } from "../../types/types";
// import { EndRentForm } from "./EndRentForm";
import { AddRentForm } from "./AddRentForm";
import { toast } from "react-toastify";
import { CurrentRents } from "./CurrentRents";
import { PastRents } from "./PastRents";
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
                <CurrentRents fetchRents={() => fetchRents()} currentRents={currentRents} />
            </div>
            <div className="main-container">
                <h1 className="self-center">Past Rents</h1>
                <PastRents pastRents={pastRents} />

            </div>




            <div className="flex justify-center p-5">
                <AddRentForm fetchRents={() => fetchRents()} />
            </div>

        </>
    )


}