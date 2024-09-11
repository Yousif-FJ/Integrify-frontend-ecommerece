import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAxiosClient } from "../utils/useAxiosClient";
import User, { UserRole } from "./User.type";

export default function RenderEditUser({ user, setUserBeingEdited }:
    { user: User | undefined, setUserBeingEdited: (user: User | undefined) => void }) {

    const httpClient = useAxiosClient();
    const queryClient = useQueryClient()


    const editUserMutation = useMutation({
        mutationFn: (updatedUser : User) => {
            return httpClient.put("users", updatedUser)
        },
        onSuccess: ( async() => {
            setUserBeingEdited(undefined);
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        })
    })

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('user');


    useEffect( () =>{
        if (user !== undefined) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }   
    }, [user])


    if (user === undefined) {
        return <></>
    }


    return <div className="p-3 rounded-md mx-auto my-auto sm:w-3/4 md:w-2/4 h-fit fixed max-h-fit inset-0 bg-slate-100">
        <form onSubmit={(e)=>{
            e.preventDefault();
            const updatedUser : User = { id: user.id, name, email, role};
            editUserMutation.mutate(updatedUser);
        }}>
            <div className="pb-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Edit user</h2>

                <div className="mt-4 sm:col-span-4">
                    <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                autoComplete="given-name"
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                value={email}
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                            User role
                        </label>
                        <div className="mt-2">
                            <select id='role' value={role} name='role'
                                onChange={(e) => setRole(e.target.value as UserRole)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setUserBeingEdited(undefined)}>
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
}