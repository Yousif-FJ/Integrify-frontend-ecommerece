import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <nav className='flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver'>
        <h1 className="text-lg font-semibold">e-commerce</h1>        
        <ul className='flex gap-[40px] text-m'>
          <li>
            <Link to={'home'}>Home</Link>
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
          <li>
            <Link to={'login'}>Login</Link>
          </li>
          <li>
            <Link to={'register'}>Register</Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default App
