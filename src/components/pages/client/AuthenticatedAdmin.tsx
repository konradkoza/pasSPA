import { FC } from 'react';
import useUserContext from '../../../hooks/useUserContext';
import { NavLink } from 'react-router-dom';

const AuthenticatedAdmin: FC = () => {
    const { user } = useUserContext();


    return (
        <>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">User name: {user?.login}</h2>
                <h2 className="text-2xl font-bold">Your id is {user?.id}</h2>
            </div>
            <div className='flex justify-center gap-5 items-center p-10'>
                <NavLink to={`/administrator/users`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Manage Users
                    </button>
                </NavLink>
            </div>

        </>
    )
}

export default AuthenticatedAdmin;