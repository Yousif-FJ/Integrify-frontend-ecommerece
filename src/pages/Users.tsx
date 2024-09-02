import { useQuery } from "@tanstack/react-query";
import User from "../types/User";
import { useAxiosClient } from "../utils/axiosClient";



export default function Users() {

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
        <div>
            {users.map(u => RenderUser(u))}
        </div>
    </>
}

function RenderUser(user : User){
    return <>
        <div className="flex">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
        </div>
    </>
}