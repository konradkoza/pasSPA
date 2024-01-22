import { FC, createContext, useState, ReactNode } from "react";
import { User } from "../components/types/types";


export interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);



export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </ UserContext.Provider>
    )
}

export default UserContext;