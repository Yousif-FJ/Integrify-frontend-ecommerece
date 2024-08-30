import { useQuery } from "@tanstack/react-query";

import Product from "../types/Product"
import httpClient from "../utils/axiosClient"
import { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";


export default function Home() {

    const authState = useContext(AuthContext);

    const { isPending, error, data } = useQuery({
        queryKey: ['products'], queryFn: async () => {
            const result = await httpClient.get("products");
            return result.data;
        },
    });

    const products = data as Product[];

    // const [products, setProducts] = useState<Product[]>([
    //     { id: '1', name: 'T-shirt', price: 50, description: 'a T-shirt' },
    //     { id: '2', name: 'T-shirt 2', price: 50, description: 'a T-shirt' },
    //     { id: '3', name: 'T-shirt 3', price: 50, description: 'a T-shirt' },
    // ]);

    if (isPending) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error);
        return <p> an error occurred</p>
    }
    
    return <div className="bg-white">
        <p>For testing: current token : {authState.token}</p>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
        </div>
    </div>
}