import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";

import { useAxiosClient } from "../utils/axiosClient"
import Product from "../types/Product";
import { useContext } from "react";
import { CartContext, CartSetterContext } from "../App";
import CartItem from "../types/CartItem";


export default function ProductDetails() {

    const httpClient = useAxiosClient();

    const { productId } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: [`product:${productId}`], queryFn: async () => {
            const result = await httpClient.get(`products/${productId}`);
            return result.data;
        },
    });

    const product = data as Product;


    const cartState = useContext(CartContext);
    const cartSetter = useContext(CartSetterContext);

    if (isPending) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error);
        return <p> an error occurred</p>
    }

    return (
        <div className="bg-white">
            <div className="pt-6 lg:grid lg:grid-cols-2 gap-6 m-2">

                <div>
                    <img
                        src='https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
                        className="h-full w-full"
                    />
                </div>

                <div className="my-auto max-w-2xl">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    <div className="mt-4 lg:mt-0">
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}$</p>

                        <div className="py-2">
                            <div>
                                <div>
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            const cartItem = cartState.find(item => item.product.id == product.id);
                            if (cartItem === undefined) {
                                const newCartItem : CartItem = {product : product, quantity: 1};
                                cartSetter([...cartState, newCartItem])  
                            }else{
                                cartItem.quantity += 1;
                            }
                            alert("item added");
                        }}>
                            <button
                                type="submit"
                                className="mt-2 flex items-center justify-center rounded-md border
                                        border-transparent bg-indigo-600 px-8 py-3 text-base font-medium
                                         text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to bag
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}