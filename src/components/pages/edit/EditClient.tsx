//react component for editing a client and sending the data to the server through form, using the client id and endpoint at /clients/:id with a put request
// initial client data is passed in by outer component
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/fetcher";
import { Client } from "../Clients";

interface Params {
    id: string;
    [key: string]: string;
}
export const EditClient: FC = () => {
    const [client, setClient] = useState<Client>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    const { id } = useParams<Params>();

    useEffect(() => {
        instance.get(`/clients/${id}`).then((response) => {
            setClient(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUsername(response.data.username);
            setActive(response.data.active);
        }, (error) => {
            console.log(error);
        }
        );
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        instance.put(`/clients/${id}`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            active: active
        }).then((response) => {
            console.log(client);
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
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Active</label>
                    <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}