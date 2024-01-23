import { FC, createContext, useState, ReactNode } from "react";
import { User } from "../components/types/types";


export interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    etagPassword: string | null;
    setEtagPassword: (etag: string) => void;
    etagMofify: string | null;
    setEtagMofify: (etag: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);



export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [etagPassword, setEtagPassword] = useState<string | null>(null);
    const [etagMofify, setEtagMofify] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser, etagPassword, setEtagPassword, etagMofify, setEtagMofify }}>
            {children}
        </ UserContext.Provider>
    )
}

export default UserContext;