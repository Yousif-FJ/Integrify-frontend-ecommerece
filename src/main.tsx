import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './products/ProductsPage.tsx';
import Login from './authentication/LoginPage.tsx';
import RegisterPage from './authentication/RegisterPage.tsx';
import OrdersPage from './orders/OrdersPage.tsx';
import ProductDetailsPage from './products/ProductDetailsPage.tsx';
import CartPage from './cart/CartPage.tsx';
import UsersPage from './users/UsersPage.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage></ProductDetailsPage>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <RegisterPage></RegisterPage>
      },
      {
        path: "orders",
        element: <OrdersPage></OrdersPage>
      },
      {
        path: "users",
        element: <UsersPage></UsersPage>
      },
      {
        path: "cart",
        element: <CartPage></CartPage>
      }
    ]
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 3,
      retryDelay: 1000
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
