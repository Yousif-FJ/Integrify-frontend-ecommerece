import { createContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import AuthUser from './types/AuthUser';


export const AuthContext = createContext<AuthUser>({});
export const AuthSetterContext =
  createContext<React.Dispatch<React.SetStateAction<AuthUser>>>(() => { });


function getInitialAuthState() {
  const authUserStr = localStorage.getItem('authState');

  if (authUserStr) {
    return JSON.parse(authUserStr) as AuthUser;
  } else {
    return {};
  }
}

function App() {

  const [authState, setAuthState] = useState<AuthUser>(getInitialAuthState());

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <>
      <AuthContext.Provider value={authState}>
        <AuthSetterContext.Provider value={setAuthState}>
          <nav className='flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver'>
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
            </ul>
          </nav>
          <Outlet></Outlet>

        </AuthSetterContext.Provider>

      </AuthContext.Provider>
    </>
  )
}

export default App
