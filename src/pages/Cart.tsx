import { useContext, useMemo } from "react"
import { CartContext, CartSetterContext } from "../App"
import { Link } from "react-router-dom";
import CartItem from "../types/CartItem";

export default function Cart() {
    const cartState = useContext(CartContext);
    const cartStateSetter = useContext(CartSetterContext)

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
                            <p>Subtotal</p>
                            <p>{cartTotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a
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
