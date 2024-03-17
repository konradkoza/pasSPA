import { FC, createContext, useState, ReactNode } from "react";
import { User } from "../components/types/types";


export interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    etagPassword: string | null;
    setEtagPassword: (etag: string | null) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);



export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [etagPassword, setEtagPassword] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser, etagPassword, setEtagPassword }}>
            {children}
        </ UserContext.Provider>
    )
}

export default UserContext;