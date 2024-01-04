import { Rent } from "../../types/types";
import { FC } from "react";
import { EndRentForm } from "./EndRentForm";

interface CurrentRentsProps {
    currentRents: Rent[];
    fetchRents: () => void;
}

export const CurrentRents: FC<CurrentRentsProps> = ({ currentRents, fetchRents }) => {

    return (
        <>
            <div className="table-container">

                <table className="w-fit">
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
                        {currentRents.map((rent) => (
                            <tr key={rent.id}>
                                <td>{rent.user.username}</td>
                                <td>{rent.movie.title}</td>
                                <td>{rent.id}</td>
                                <td>{rent.startDate.toString()}</td>
                                {/* <td>{rent.endDate?.toString()}</td> */}
                                <td>{
                                    rent.endDate ? rent.endDate.toString() :
                                        <EndRentForm fetchRents={() => fetchRents()} id={rent.id} />
                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-container-mobile">
                {currentRents.map((rent) => (
                    <ul className="mobile-element" key={rent.id}>
                        <li><span>Title:</span> {rent.user.username}</li>
                        <li><span>Cost:</span> {rent.movie.title}</li>
                        <li><span>Id:</span> {rent.id}</li>
                        <li><span>Start date:</span> {rent.startDate}</li>
                        <li> {
                            rent.endDate ? <> <span>End date:</span> {rent.endDate.toString()} </> :
                                <>
                                    <EndRentForm fetchRents={() => fetchRents()} id={rent.id} />
                                </>

                        }</li>
                    </ul>
                ))}

            </div>
        </>

    )
}