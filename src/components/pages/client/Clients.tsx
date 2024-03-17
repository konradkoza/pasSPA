import { FC, useState } from "react";
import { Client } from "../../types/types"
import { EditClientForm } from "./EditClientForm";

interface Props {
    clients: Client[];
    fetchClients: () => void;
    setActive: (id: string, value: boolean) => void;
}

export const Clients: FC<Props> = ({ clients, fetchClients, setActive }) => {
    const [filterValue, setFilterValue] = useState('');

    const filteredClients = clients.filter((client) =>
        client.username.includes(filterValue)
    );

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };

    return (
        <>
            <div className="main-container">
                <h1 className="self-center">clients</h1>
                <input
                    className=" p-2 self-center rounded-lg"
                    type="text"
                    value={filterValue}
                    onChange={handleFilterChange}
                    placeholder="Filter by username"
                />
                <div className="table-container">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Active</th>
                                <th className="text-center" colSpan={2}>Actions</th>
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
                            </div>
                        </ul>
                    ))}

                </div>


            </div>

        </>

    )
}