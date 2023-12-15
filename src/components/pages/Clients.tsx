import instance from "../api/fetcher";
import { FC, useEffect, useState } from "react";


export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
}



export const Clients: FC = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        instance.get("/clients").then((response) => {
            setClients(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }, []);



    return (
        <>
            <div >
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
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.id}</td>
                                <td>{client.username}</td>
                                <td>{client.active ? "true" : "false"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}