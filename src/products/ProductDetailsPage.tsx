import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../utils/useAxiosClient"
import Product from "./Product.type";
import React, { useContext } from "react";
import CartItem from "../cart/CartItem.type";
import { queryClientConfig } from "../utils/queryClientConfig";
import { CartStateContext } from "../cart/CartPage";


export default function ProductDetailsPage() {

    const httpClient = useAxiosClient();

    const { productId } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: [`product:${productId}`], queryFn: async () => {
            const result = await httpClient.get(`products/${productId}`);
            return result.data;
        },
    }, queryClientConfig);

    const product = data as Product;


    const [cart, setCart] = useContext(CartStateContext);

    function handleAddItemToCart(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cartItem = cart.find(item => item.product.id == product.id);
        if (cartItem === undefined) {
            const newCartItem : CartItem = {product : product, quantity: 1};
            setCart([...cart, newCartItem])  
        }else{
            cartItem.quantity += 1;
        }
        alert("item added");
    }

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

                        <form onSubmit={handleAddItemToCart}>
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