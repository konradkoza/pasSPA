
export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
}

export interface RegisterClient {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface User {
    id: string;
    login: string;
    token: string;
    userType: "CLIENT" | "MODERATOR" | "ADMINISTRATOR";
    active?: boolean;
    lastName?: string;
    firstName?: string;
}

export interface Administrator {
    id: string;
    username: string;
    active: boolean;
}

export interface Moderator {
    id: string;
    username: string;
    active: boolean;
}

export interface EditClientProps {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
    fetchClients: () => void;
}

export interface AdminstratorsModeratorsProps {
    users: Administrator[] | Moderator[];
    fetchUsers: () => void;
    setActive: (id: string, value: boolean) => void;
    role: "administrators" | "moderators"
}

export interface EditAdministratorModeratorProps {
    id: string;
    username: string;
    active: boolean;
    fetchUsers: () => void;
    role: "administrators" | "moderators";
}

export interface ClientRequest {
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
    password: string;
}

export interface ModeratorRequest {
    username: string;
    active: boolean;
    password: string;
}

export interface AdministratorRequest {
    username: string;
    active: boolean;
    password: string;
}


export interface MovieRequest {
    title: string;
    cost: number;
}

export interface EditMovieProps {
    id: string;
    title: string;
    cost: number;
    fetchMovies: () => void;

}

export interface Movie {
    id: string;
    title: string;
    cost: number;
}

export interface RentRequest {
    clientId: string;
    movieId: string;
    startDate: string;
    endDate: string | null;
}

export interface RentForMeRequest {

    movieId: string;
    startDate: string;
    endDate: string | null;
}

export interface endRentRequest {
    id: string;
    endDate: string;
}

export type EndRentProps = {
    id: string;
    fetchRents: () => void;
}

export interface Rent {
    id: string;
    client: Client;
    movie: Movie;
    startDate: string;
    endDate: string | null;
}