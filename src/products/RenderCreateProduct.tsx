import { useState } from "react";
import { useAxiosClient } from "../utils/useAxiosClient";
import { useMutation } from "@tanstack/react-query";
import { queryClientConfig } from "../utils/queryClientConfig";
import CreateProduct from "./CreateProduct.type";

export default function RenderCreateProduct({showCreateForm, setShowCreateForm} : 
    {showCreateForm: boolean,  setShowCreateForm: (showCreateForm : boolean) => void }){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, SetQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const httpClient = useAxiosClient();
    const createProductMutator = useMutation({
        mutationFn: () => {
            const product : CreateProduct = {name, description, quantity, price, discount};
            return httpClient.post("products", product)
        },onSuccess() {
            setShowCreateForm(false);
            alert("Product created");
        },

    }, queryClientConfig)

    if (showCreateForm == false) {
        return <></>
    }


    return <div className="overflow-auto h-fit fixed max-h-fit z-10 inset-0 p-3 rounded-md mx-auto my-auto sm:w-3/4 md:w-2/4 bg-slate-100">
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault();
            createProductMutator.mutate();
        }}>
            <div className="pb-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">create product</h2>

                <div className="mt-4 sm:col-span-4">
                    <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            description
                        </label>
                        <div className="mt-2">
                            <input
                                id="description"
                                name="description"
                                value={description}
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    
                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                            quantity
                        </label>
                        <div className="mt-2">
                            <input
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                type="number"
                                onChange={(e) => SetQuantity( Number(e.target.value))}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        price
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                name="price"
                                value={price}
                                type="number"
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:col-span-4">
                        <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                        discount
                        </label>
                        <div className="mt-2">
                            <input
                                id="discount"
                                name="discount"
                                value={discount}
                                type="number"
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setShowCreateForm (false)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
}