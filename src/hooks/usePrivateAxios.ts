import { useEffect } from "react";
import { privateInstance } from "../components/api/fetcher";
import useUserContext from "./useUserContext";
import { User } from "../components/types/types";
import { useNavigate } from "react-router-dom";

const usePrivateAxios = () => {
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        const requestInterceptor = privateInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.token}`;
            return config;

        }, (error) => {
            Promise.reject(error);
        });
        const responseInterceptor = privateInstance.interceptors.response.use((response) => response, (error) => {
            if (error.response.status === 403) {
                setUser({} as User);
                navigate("/login");
            }
            return Promise.reject(error);

        });
        return () => {
            privateInstance.interceptors.request.eject(requestInterceptor);
            privateInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [user]);




    return privateInstance;
}
export default usePrivateAxios;