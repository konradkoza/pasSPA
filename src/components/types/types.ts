
export interface Client {
    id: string;
    firstName: string;
    lastName: string;
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

export interface ClientRequest {
    firstName: string;
    lastName: string;
    username: string;
    active: boolean;
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
    user: Client;
    movie: Movie;
    startDate: string;
    endDate: string | null;
}