import { FC, useEffect, useState } from "react";
import instance from "../../api/fetcher";
import { Client } from "../Clients";





export const EditClient: FC<Client> = ({ id, firstName, lastName, username, active }) => {
    const [clientFirstName, setFirstName] = useState<string>(firstName);
    const [clientLastName, setLastName] = useState<string>(lastName);
    const [clientUsername, setUsername] = useState<string>(username);
    const [clientActive, setActive] = useState<boolean>(active);
    const [clientId, setId] = useState<string>(id);

    useEffect(() => {
        setId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setUsername(username);
        setActive(active);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        instance.put(`/clients/${clientId}`, {
            firstName: clientFirstName,
            lastName: clientLastName,
            username: clientUsername,
            active: clientActive
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Id</label>
                    <input type="text" value={clientId} onChange={(e) => setId(e.target.value)} />
                    <label>First Name</label>
                    <input type="text" value={clientFirstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label>Last Name</label>
                    <input type="text" value={clientLastName} onChange={(e) => setLastName(e.target.value)} />
                    <label>Username</label>
                    <input type="text" value={clientUsername} onChange={(e) => setUsername(e.target.value)} />
                    <label>Active</label>
                    <input type="checkbox" checked={clientActive} onChange={(e) => setActive(e.target.checked)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}