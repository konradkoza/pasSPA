import instance from "../../api/fetcher";
import { FC, useEffect, useState } from "react";
import { EditClientForm } from "./EditClientForm";
import { AddClientForm } from "./AddClientForm";
import { NavLink } from "react-router-dom";
import { Client } from "../../types/types";


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
        }, (error) => {
            console.log(error);
        }
        );




    }

    const fetchClients = () => {
        instance.get("/clients").then((response) => {
            setClients(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }

    return (
        <>
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg flex-col my-2">
                <input
                    type="text"
                    value={filterValue}
                    onChange={handleFilterChange}
                    placeholder="Filter by username"
                />
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.id}</td>
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
            <div className="flex">
                <AddClientForm fetchClients={() => fetchClients()} />
            </div>

        </>
    )
}