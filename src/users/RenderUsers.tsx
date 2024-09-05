import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../utils/axiosClient";
import User from "./User.type";

export default function RenderUsers({ setUserBeingEdited }:
    { setUserBeingEdited: (user: User) => void }
) {
    const httpClient = useAxiosClient();
    const queryClient = useQueryClient()


    const deleteUserMutation = useMutation({
        mutationFn: (userId: string) => {
            return httpClient.delete(`users/${userId}`);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    }, queryClient);

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
        {users.map(user => <div key={user.id} className="grid grid-cols-6 max-w-4xl py-4 px-1 border-b-2 ">
            <div>{user.name}</div>
            <div className="col-span-2">{user.email}</div>
            <div>{user.role}</div>
            <button onClick={() => {
                setUserBeingEdited(user);}}>
                    Edit</button>
            <button onClick={() => {
                if (confirm("Are you sure, you want to delete this user?")) {
                    deleteUserMutation.mutate(user.id);
                }}}>
                    Delete</button>
        </div>)}
    </>
}