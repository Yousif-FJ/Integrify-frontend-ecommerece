import { useQuery } from "@tanstack/react-query";
import User from "../types/User";
import { useAxiosClient } from "../utils/axiosClient";
import { useState } from "react";



export default function Users() {


    const [userBeingEdited, setUserBeingEdited] = useState<User | undefined>(undefined);


    return <>
        <div>
            {RenderUsers(setUserBeingEdited)}
            {RenderEditUser(userBeingEdited)}
        </div>
    </>
}

function RenderUsers(setUserBeingEdited: (user: User) => void) {

    const httpClient = useAxiosClient();


    const { isPending, error, data } = useQuery({
        queryKey: ['users'], queryFn: async () => {
            const result = await httpClient.get("users");
            return result.data;
        }
    });

    const users = data as User[];

    if (isPending) {
        return <p>Loading</p>
    }

    if (error) {
        console.log(error);
        return <p>Error</p>
    }


    return <>
        {users.map(user => <div key={user.id} className="grid grid-cols-4 max-w-4xl py-4 px-1 border-b-2 ">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            <button onClick={() => {
                setUserBeingEdited(user);
            }}>Edit</button>
        </div>)}
    </>
}

function RenderEditUser(user: User | undefined) {
    if (user === undefined) {
        return <></>
    }

    return <div className="p-3 rounded-md mx-auto my-auto sm:w-3/4 md:w-2/4 h-fit fixed max-h-fit inset-0 bg-slate-100">
        <form>
                <div className="pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit user</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
        </form>
    </div>
}