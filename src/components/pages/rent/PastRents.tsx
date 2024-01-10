import { Rent } from "../../types/types";
import { FC } from "react";


export const PastRents: FC<{ pastRents: Rent[] }> = ({ pastRents }) => {

    return (
        <>
            <div className="table-container">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Movie</th>
                            <th>Rent Id</th>
                            <th>Rent Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastRents.map((rent) => (
                            <tr key={rent.id}>
                                <td>{rent.user.username}</td>
                                <td>{rent.movie.title}</td>
                                <td>{rent.id}</td>
                                <td>{rent.startDate.toString()}</td>
                                <td>{rent.endDate?.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container-mobile">
                {pastRents.map((rent) => (
                    <ul className="mobile-element" key={rent.id}>
                        <li><span>Title:</span> {rent.user.username}</li>
                        <li><span>Cost:</span> {rent.movie.title}</li>
                        <li><span>Id:</span> {rent.id}</li>
                        <li><span>Start date:</span> {rent.startDate}</li>
                        <li><span>End date:</span> {rent.endDate?.toString()}</li>
                    </ul>
                ))}

            </div>
        </>

    )
}