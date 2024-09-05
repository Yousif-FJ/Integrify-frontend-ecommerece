import { useContext, useMemo, useState } from "react"
import { AuthContext, CartContext, CartSetterContext } from "../App"
import { useNavigate } from "react-router-dom";
import RenderCartItem from "./RenderCartItem";
import RenderCreateOrder from "./RenderCreateOrder";

export default function CartPage() {
    const cartState = useContext(CartContext);
    const cartStateSetter = useContext(CartSetterContext)
    const authState = useContext(AuthContext);
    const navigate = useNavigate();

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
                                onClick={() => {
                                    if (authState.token === undefined) {
                                        navigate('/login');
                                    }
                                    setShowOrderFrom(true);
                                }}
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
        {RenderCreateOrder({showOrderForm, setShowOrderFrom})}
    </div>
}
