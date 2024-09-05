import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import product from "./product.type"
import { useAxiosClient } from "../utils/axiosClient"
import { queryClientConfig } from "../utils/queryClientConfig";
import RenderProducts from "./RenderProducts";


export default function HomePage() {
    const httpClient = useAxiosClient();

    const [search, setSearch] = useState('');


    const { isPending, error, data } = useQuery({
        queryKey: ['products', search], queryFn: async () => {
            const result = await httpClient.get("products", {
                params: { "searchValue": search }
            });
            return result.data;
        },
    }, queryClientConfig);

    const products = data as product[];


    return <>
        <div className="flex">
            <input
                type="text"
                placeholder="search"
                className="rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {RenderProducts({ products, isPending, error })}
    </>
}

