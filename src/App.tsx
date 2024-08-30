import { createContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import AuthUser from './types/AuthUser';
import NavBar from './components/NavBar';


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
          
          <NavBar/>
          <Outlet/>

        </AuthSetterContext.Provider>

      </AuthContext.Provider>
    </>
  )
}

export default App
