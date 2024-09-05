import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import Product from "../types/Product"
import { useAxiosClient } from "../utils/axiosClient"
import { queryClientConfig } from "../utils/queryClientConfig";


export default function Home() {
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

    const products = data as Product[];


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

function RenderProducts({ products, isPending, error }: { products: Product[], isPending: boolean, error: Error | null }) {

    if (isPending) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error);
        return <p> an error occurred</p>
    }


    return <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
            <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                        src='https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <Link to={`/products/${product.id}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Large</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
            </div>
        ))}
    </div>
}