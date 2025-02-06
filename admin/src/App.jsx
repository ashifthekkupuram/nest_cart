import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import AuthRequired from './components/AuthRequired'
import AuthRedirect from './components/AuthRedirect'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthRequired />,
      children: [{
        path: '/',
        element: <Dashboard />
      }]
    },
    {
      path: '/',
      element: <AuthRedirect />,
      children: [{
        path: '/login',
        element: <Login />
      }]
    },
  ])

  return <RouterProvider router={router} />

}

export default App
