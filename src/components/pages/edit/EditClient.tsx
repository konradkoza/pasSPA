import { FC, useEffect, useState } from "react";
import instance from "../../api/fetcher";
import { Client } from "../Clients";

import { Dialog } from '@headlessui/react'



export const EditClient: FC<Client> = ({ id, firstName, lastName, username, active }) => {
    const [clientFirstName, setFirstName] = useState<string>(firstName);
    const [clientLastName, setLastName] = useState<string>(lastName);
    const [clientUsername, setUsername] = useState<string>(username);
    const [clientActive, setActive] = useState<boolean>(active);
    const [clientId, setId] = useState<string>(id);

    //modal
    let [isOpen, setIsOpen] = useState(false)

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
        setIsOpen(false);
    }

    return (
        <>

            <button onClick={() => setIsOpen(true)}>Edit</button>
            <Dialog
                about="div"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >

                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-3/4 h-fit rounded bg-white">
                        <h4 className=" text-center">Edit client form</h4>
                        <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit}>

                            <label>Id</label>
                            <input type="text" value={clientId} onChange={(e) => setId(e.target.value)} />


                            <label>First Name</label>
                            <input type="text" value={clientFirstName} onChange={(e) => setFirstName(e.target.value)} />


                            <label>Last Name</label>
                            <input type="text" value={clientLastName} onChange={(e) => setLastName(e.target.value)} />


                            <label>Username</label>
                            <input type="text" value={clientUsername} onChange={(e) => setUsername(e.target.value)} />


                            <label>Active</label>
                            <input className=" place-self-start" type="checkbox" checked={clientActive} onChange={(e) => setActive(e.target.checked)} />

                            <button className=" col-span-2" type="submit">Submit</button>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </>
    )
}