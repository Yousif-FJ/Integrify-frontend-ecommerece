import { Link } from "react-router-dom";

export default function NavBar() {
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
                <Link to={'categories'}>Categories</Link>
            </li>
            <li>
                <Link to={'users'}>Users</Link>
            </li>
        </ul>

        <ul className='flex gap-[30px] text-m'>
            <li>
                <Link to={'login'}>Login</Link>
            </li>
            <li>
                <Link to={'register'}>Register</Link>
            </li>
            <li>
                <Link to={'cart'}>Cart</Link>
            </li>
        </ul>
    </nav>
}