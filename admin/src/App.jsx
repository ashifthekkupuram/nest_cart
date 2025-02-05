import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from './pages/Dashboard'
import AuthRedirect from "./components/AuthRequired"
import AuthRequired from "./components/AuthRequired"

import AuthProvider from "./context/AuthContext"

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
      path: '/login',
      element: <AuthRedirect />,
      children: [{
        path: '',
        element: <Login />
      }]
    }
  ])

  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
}

export default App
