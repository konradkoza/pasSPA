import instance from "../../api/fetcher";
import { FC, useEffect, useState } from "react";
import { EditClientForm } from "./EditClientForm";
import { AddClientForm } from "./AddClientForm";
import { NavLink } from "react-router-dom";
import { Client } from "../../types/types";
import { toast } from "react-toastify";

export const Clients: FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [filterValue, setFilterValue] = useState('');

    const filteredClients = clients.filter((client) =>
        client.username.includes(filterValue)
    );

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };
    useEffect(() => {

        fetchClients();

    }, []);

    const setActive = (id: string, value: boolean) => {
        instance.patch(`/users/${id}`, { active: value }).then((response) => {
            console.log(response);
            fetchClients();
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

    return (
        <>
            <div className="main-container">
                <input
                    className=" p-2 self-center rounded-lg"
                    type="text"
                    value={filterValue}
                    onChange={handleFilterChange}
                    placeholder="Filter by username"
                />
                <div className="table-container">
                    <table className="w-fit">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Active</th>
                                <th className="text-center" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.firstName}</td>
                                    <td>{client.lastName}</td>
                                    <td >{client.id}</td>
                                    <td>{client.username}</td>
                                    <td>{client.active ? "true" : "false"}</td>
                                    <td><button onClick={() => setActive(client.id, client.active ? false : true)} className={client.active ? "btn-delete" : "btn-edit"}> {client.active ? "Deactivate" : "Activate"} </button> </td>
                                    <td><EditClientForm {...client} fetchClients={() => fetchClients()} /></td>
                                    <td><NavLink to={client.id} className={"btn-edit"}>Rents</NavLink></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-container-mobile">
                    {filteredClients.map((client) => (
                        <ul className="mobile-element" key={client.id}>
                            <li><span>First name:</span> {client.firstName}</li>
                            <li><span>Last name:</span> {client.lastName}</li>
                            <li><span>Id:</span> {client.id}</li>
                            <li><span>Username:</span> {client.username}</li>
                            <li><span>Active:</span> {client.active ? "true" : "false"}</li>
                            <div className="flex justify-around mt-2">
                                <li><button onClick={() => setActive(client.id, client.active ? false : true)} className={client.active ? "btn-delete" : "btn-edit"}> {client.active ? "Deactivate" : "Activate"} </button></li>
                                <li>
                                    <EditClientForm {...client} fetchClients={() => fetchClients()} />
                                </li>
                                <li>
                                    <NavLink to={client.id} className={"btn-edit"}>Rents</NavLink>
                                </li>
                            </div>
                        </ul>
                    ))}

                </div>


            </div>
            <div className="flex justify-center p-5">
                <AddClientForm fetchClients={() => fetchClients()} />
            </div>

        </>
    )
}