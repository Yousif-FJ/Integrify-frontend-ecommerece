import { Link } from "react-router-dom";
import CartItem from "./CartItem.type";

export default function RenderCartItem({cartItem, removeCartItem} :
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