import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'

import AuthUser from './authentication/AuthUser.type';
import RenderNavBar from './common/RenderNavBar';
import CartItem from './cart/CartItem.type';
import { CartStateContext } from './cart/CartPage';


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


function getInitialCartState() {
  const cartStateStr = localStorage.getItem('cartState');

  if (cartStateStr) {
    return JSON.parse(cartStateStr) as CartItem[];
  } else {
    return [];
  }
}

function App() {

  const [authState, setAuthState] = useState<AuthUser>(getInitialAuthState());

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const cartState = useState<CartItem[]>(getInitialCartState());

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
  }, [cartState])

  return (
    <>
      <AuthContext.Provider value={authState}>
        <AuthSetterContext.Provider value={setAuthState}>

            <CartStateContext.Provider value={cartState}>

              <RenderNavBar />
              <div className='mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
                <Outlet />
              </div>

            </CartStateContext.Provider>

        </AuthSetterContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
