import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CartContext, CartSetterContext } from "../App";
import CreateOrderRequest from "./CreateOrderRequest.type";
import { useAxiosClient } from "../utils/useAxiosClient";
import { queryClientConfig } from "../utils/queryClientConfig";

export default function RenderCreateOrder({ showOrderForm, setShowOrderFrom } :
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