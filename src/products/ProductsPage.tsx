import { useContext, useState } from "react";

import RenderProducts from "./RenderProducts";
import RenderCreateProduct from "./RenderCreateProduct";
import { AuthContext } from "../App";

export default function HomePage() {
    const authContext = useContext(AuthContext);

    const [search, setSearch] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);


    const openCreateProductButton = authContext.user?.role === 'admin' ?
        <button 
            onClick={() => setShowCreateForm(true)}
            className="ml-auto flex items-center justify-center rounded-md border
            border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add product
        </button> : ''

    return <>
        <div className="flex">
            <input
                type="text"
                placeholder="search"
                className="rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => { 
                    setSearch(e.target.value);
                }}
            />
            {openCreateProductButton}
        </div>
        {RenderProducts({ search })}
        {RenderCreateProduct({ showCreateForm, setShowCreateForm })}
    </>
}

