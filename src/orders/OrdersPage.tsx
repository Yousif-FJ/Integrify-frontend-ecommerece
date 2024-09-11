import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../utils/useAxiosClient";
import Order from "./Order.type";

export default function OrdersPage() {
    const httpClient = useAxiosClient();

    const { isPending, error, data } = useQuery({
        queryKey: ['orders'], queryFn: async () => {
            const result = await httpClient.get("orders");
            return result.data;
        }
    });

    const orders = data as Order[];

    if (error) {
        return <p>Error</p>
    } 

    if (isPending) {
        return <p>Loading</p>
    }

    return <>
        {orders.map(order => <div key={order.id} className="grid grid-cols-4 max-w-4xl py-4 px-1 border-b-2 ">
            <div className="col-span-2">{order.id}</div>
            <div>{order.userName}</div>
            <div>{order.orderDate}</div>
        </div>)}
    </>
}