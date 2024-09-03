import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'

import AuthUser from './types/AuthUser';
import NavBar from './components/NavBar';
import CartItem from './types/CartItem';


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

export const CartContext = createContext<CartItem[]>([]);
export const CartSetterContext = createContext<React.Dispatch<React.SetStateAction<CartItem[]>>>(() => { });


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

  const [cartState, setCartState] = useState<CartItem[]>(getInitialCartState());

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
  }, [cartState])

  return (
    <>
      <AuthContext.Provider value={authState}>
        <AuthSetterContext.Provider value={setAuthState}>

          <CartContext.Provider value={cartState}>
            <CartSetterContext.Provider value={setCartState}>

              <NavBar />
              <div className='mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
                <Outlet />
              </div>

            </CartSetterContext.Provider>
          </CartContext.Provider>

        </AuthSetterContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
