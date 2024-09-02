import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext, AuthSetterContext } from "../App";

export default function NavBar() {

    const authState = useContext(AuthContext);

    return <nav className='flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver'>
        <ul className='flex gap-[30px] text-m'>
            <li>
                <Link className='font-semibold' to={'/'}>
                    e-commerce
                </Link>
            </li>
            <li>
                <Link to={'orders'}>Orders</Link>
            </li>
            <li>
                <Link to={'users'}>Users</Link>
            </li>
        </ul>

        <ul className='flex gap-[30px] text-m'>
            {RenderAuthNavPart({isLoggedIn: authState.user !== undefined})}
            <li>
                <Link to={'cart'}>Cart</Link>
            </li>
        </ul>
    </nav>
}

function RenderAuthNavPart({isLoggedIn}: {isLoggedIn: boolean}) {
    const authSetter = useContext(AuthSetterContext);

    if (isLoggedIn) {
        return <>
            <li>
                <button onClick={() => authSetter({})}>
                    Logout
                </button>
            </li>
        </>
    }


    return <>
        <li>
            <Link to={'login'}>Login</Link>
        </li>
        <li>
            <Link to={'register'}>Register</Link>
        </li>
    </>
}