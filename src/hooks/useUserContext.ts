import UserContext from "../context/UserContext";
import { useContext } from "react";


const useUserContext = () => {
    return useContext(UserContext);

}

export default useUserContext;