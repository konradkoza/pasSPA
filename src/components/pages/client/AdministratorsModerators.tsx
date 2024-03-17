import { FC, useState } from "react";
import { AdminstratorsModeratorsProps } from "../../types/types"
import { EditAdministratorModeratorForm } from "./EditAdministratorForm";
// import { NavLink } from "react-router-dom";

export const AdministratorsModerators: FC<AdminstratorsModeratorsProps> = ({ users, fetchUsers, setActive, role }) => {
    const [filterValue, setFilterValue] = useState('');

    const filteredUsers = users.filter((administrator) =>
        administrator.username.includes(filterValue)
    );

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };

    return (
        <>
            <div className="main-container">
                <h1 className="self-center">{role}</h1>
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
                                <th>Id</th>
                                <th>Username</th>
                                <th>Active</th>
                                <th className="text-center" colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.active ? "true" : "false"}</td>
                                    <td className="">
                                        <button onClick={() => setActive(user.id, user.active ? false : true)} className={user.active ? "btn-delete" : "btn-edit"}>
                                            {user.active ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                    <td className="">
                                        <EditAdministratorModeratorForm {...user} fetchUsers={() => fetchUsers()} role={role} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-container-mobile">
                    {users.map((administrator) => (
                        <ul className="mobile-element" key={administrator.id}>
                            <li><span>Id:</span> {administrator.id}</li>
                            <li><span>Username:</span> {administrator.username}</li>
                            <li><span>Active:</span> {administrator.active ? "true" : "false"}</li>
                            <div className="flex justify-around mt-2">
                                <li>
                                    <button onClick={() => setActive(administrator.id, administrator.active ? false : true)} className={administrator.active ? "btn-delete" : "btn-edit"}>
                                        {administrator.active ? "Deactivate" : "Activate"}
                                    </button>
                                </li>
                                <li>
                                    <EditAdministratorModeratorForm {...administrator} fetchUsers={() => fetchUsers()} role={role} />
                                </li>
                            </div>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    )
}