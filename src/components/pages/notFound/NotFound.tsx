import { FC } from "react"
import { useNavigate } from "react-router-dom"


const NotFound: FC = () => {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Not found</h1>
            <p>Requested page does not exist</p>
            <div className="flex gap-3">
                <button onClick={goBack}>Go Back</button>
            </div>
        </div>
    )
}

export default NotFound;