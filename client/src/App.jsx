import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Cart, Home, Login, Register, Profile, CreateAddress, UpdateAddress, Checkout, ChangeName, ChangePassword, ProductDetail } from './pages'
import NavWrapper from './components/NavWrapper'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'

const App = () => {

  const router = createBrowserRouter([{
    path: '/',
    element: <NavWrapper />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        'path': '/product/:productId',
        element: <ProductDetail />
      },
      {
        path: '/',
        element: <AuthRedirect />,
        children: [
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          }
        ]
      },
      {
        path: '/',
        element: <AuthRequired />,
        children: [
          {
            path: '/cart',
            element: <Cart />
          },
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/create-address',
            element: <CreateAddress />
          },
          {
            path: '/update-address/:addressId',
            element: <UpdateAddress />
          },
          {
            path: '/checkout',
            element: <Checkout />
          },
          {
            path: '/change-name',
            element: <ChangeName />
          },
          {
            path: '/change-password',
            element: <ChangePassword />
          },
        ]
      }
    ]
  }])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
