import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './styles/global.scss'

import AuthWrapper from './components/authwrapper/AuthWrapper'
import AuthRequired from './components/authrequired/AuthRequired'
import AuthRedirect from './components/authredirect/AuthRedirect'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Categories from './pages/categories/Categories'
import Products from './pages/products/Products'
import Login from './pages/login/Login'

const App = () => {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {
          path: '/',
          element: <AuthRequired />,
          children: [{
            path: '/',
            element: <Layout />,
            children: [
              {
                path: '/',
                element: <Home />
              },
              {
                path: '/categories',
                element: <Categories />
              },
              {
                path: '/products',
                element: <Products />
              },
            ]
          }]
        },
        {
          path: '/',
          element: <AuthRedirect />,
          children: [{
            path: '/login',
            element: <Login />
          }]
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
