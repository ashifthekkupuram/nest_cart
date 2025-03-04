import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Cart, Home, Login, Register, Profile, CreateAddress } from './pages'
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
          }
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
