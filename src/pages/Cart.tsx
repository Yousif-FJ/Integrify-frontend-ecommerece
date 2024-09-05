import { useContext, useMemo, useState } from "react"
import { CartContext, CartSetterContext } from "../App"
import { Link } from "react-router-dom";
import CartItem from "../types/CartItem";
import { useMutation } from "@tanstack/react-query";
import { useAxiosClient } from "../utils/axiosClient";
import { queryClientConfig } from "../utils/queryClientConfig";
import CreateOrderRequest from "../types/CreateOrderRequest";

export default function Cart() {
    const cartState = useContext(CartContext);
    const cartStateSetter = useContext(CartSetterContext)

    const [showOrderForm, setShowOrderFrom] = useState(false);

    const removeCartItem = (productId : string) => {
        cartStateSetter(cartState.filter(ci => ci.product.id !== productId));
    }

    const cartTotal = useMemo(() =>
    {
        let total = 0
        cartState.forEach((item) =>{
            total+= item.product.price * item.quantity;
        });

        return total;
    }, [cartState])


    return <div>
        <div className="pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
            <div
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                <div className="flex h-full flex-col overflow-y-scroll">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                            <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                            <div className="ml-3 flex h-7 items-center">
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartState.map((cartItem) => RenderCartItem({cartItem, removeCartItem}))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>{cartTotal}</p>
                        </div>
                        <div className="mt-6">
                            <a
                                onClick={() => {setShowOrderFrom(true)}}
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {RenderCreateOrderForm({showOrderForm, setShowOrderFrom})}
    </div>
}

function RenderCartItem({cartItem, removeCartItem} :
     {cartItem : CartItem, removeCartItem : (productId : string) => void}){
    return <li key={cartItem.product.id} className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
            src='https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
            className="h-full w-full object-cover object-center"
        />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
        <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                    <Link to={`/products/${cartItem.product.id}`}>
                        {cartItem.product.name}
                    </Link>
                </h3>
                <p className="ml-4">{cartItem.product.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Blue</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty {cartItem.quantity}</p>

            <div className="flex">
                <button type="button" 
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => removeCartItem(cartItem.product.id)}>
                    Remove
                </button>
            </div>
        </div>
    </div>
</li>
}

function RenderCreateOrderForm({ showOrderForm, setShowOrderFrom } :
     { showOrderForm : boolean, setShowOrderFrom: (value :boolean) => void }) {
    const httpClient = useAxiosClient();
    const cartState = useContext(CartContext);
    const cartStateSetter = useContext(CartSetterContext);


    const createOrderMutator = useMutation({
        mutationFn: () => {
            const productsId : string[] = cartState.flatMap(cartElement => {
                const idsListPart : string[] = [];
                for (let index = 0; index < cartElement.quantity; index++) {
                    idsListPart.push(cartElement.product.id);
                }
                return idsListPart;
            });
            const createOrderData : CreateOrderRequest = {
                city, street, postNumber, productsId
            };
            return httpClient.post("orders", createOrderData )
        },
        onSuccess: (async () =>{
            alert("Order created");
            cartStateSetter([]);
            setShowOrderFrom(false);
        })
    }, queryClientConfig)


    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postNumber, setPostNumber] = useState('');

    if (showOrderForm == false) {
        return <></>
    }


    return <div className="p-3 rounded-md mx-auto my-auto sm:w-3/4 md:w-2/4 h-fit fixed max-h-fit inset-0 bg-slate-100">
        <form onSubmit={(e)=>{
            e.preventDefault();
            createOrderMutator.mutate()
        }}>
            <div className="pb-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Checkout</h2>

                <div className="mt-4 sm:col-span-4">
                    <div className="sm:col-span-4">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={city}
                                autoComplete="address-level1"
                                onChange={(e) => setCity(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="street"
                                name="street"
                                value={street}
                                type="text"
                                autoComplete="address-level2"
                                onChange={(e) => setStreet(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="postNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Post number
                        </label>
                        <div className="mt-2">
                            <input
                                id="postNumber"
                                name="postNumber"
                                value={postNumber}
                                type="text"
                                autoComplete="address-level3"
                                onChange={(e) => setPostNumber(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setShowOrderFrom(false)}>
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Confirm order
                    </button>
                </div>
            </div>
        </form>
    </div>
}
