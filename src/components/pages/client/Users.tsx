import instance from "../../api/fetcher";
import { FC, useEffect, useState } from "react";
// import { EditClientForm } from "./EditClientForm";
import { AddClientForm } from "./AddClientForm";
// import { NavLink } from "react-router-dom";
import { Client } from "../../types/types";
import { toast } from "react-toastify";
import { Clients } from "./Clients";
import { AdministratorsModerators } from "./AdministratorsModerators";
import { AddAdministratorModeratorForm } from "./AddAdministratorForm";
export const Users: FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [administrators, setAdministrators] = useState<Client[]>([]);
    const [moderators, setModerators] = useState<Client[]>([]);



    useEffect(() => {

        fetchClients();
        fetchAdministrators();
        fetchModerators();

    }, []);

    const setActive = (id: string, value: boolean) => {
        instance.patch(`/users/${id}`, { active: value }).then((response) => {
            console.log(response);
            fetchClients();
            fetchAdministrators();
            fetchModerators();
            toast.success("Client updated");
        }, (error) => {
            console.log(error);
        }
        );




    }

    const fetchClients = () => {
        instance.get("/clients").then((response) => {
            setClients(response.data);
        }, (error) => {
            toast.error("Could not load clients");
            toast.error(error);
            toast.error(error.response.data.message);
            console.log(error);
        }
        );
    }

    const fetchAdministrators = () => {
        instance.get("/administrators").then((response) => {
            setAdministrators(response.data);
        }, (error) => {
            toast.error("Could not load administrators");
            toast.error(error);
            toast.error(error.response.data.message);
            console.log(error);
        }
        );
    }

    const fetchModerators = () => {
        instance.get("/moderators").then((response) => {
            setModerators(response.data);
        }, (error) => {
            toast.error("Could not load moderators");
            toast.error(error);
            toast.error(error.response.data.message);
            console.log(error);
        }
        );
    }


    return (
        <>
            <Clients clients={clients} fetchClients={() => fetchClients()} setActive={setActive} />
            <div className="flex justify-center p-5">
                <AddClientForm fetchClients={() => fetchClients()} />
            </div>
            <AdministratorsModerators users={administrators} fetchUsers={() => fetchAdministrators()} setActive={setActive} role="administrators" />
            <div className="flex justify-center p-5">
                <AddAdministratorModeratorForm fetchUsers={() => fetchAdministrators()} role="administrators" />
            </div>
            <AdministratorsModerators users={moderators} fetchUsers={() => fetchModerators()} setActive={setActive} role="moderators" />
            <div className="flex justify-center p-5">
                <AddAdministratorModeratorForm fetchUsers={() => fetchModerators()} role="moderators" />
            </div>


        </>
    )
}