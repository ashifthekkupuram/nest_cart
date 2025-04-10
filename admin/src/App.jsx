import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './styles/global.scss'

import NavBar from './components/navbar/NavBar'
import Menu from './components/menu/Menu'

import Home from './pages/home/Home'
import Categories from './pages/categories/Categories'
import Products from './pages/products/Products'
import Login from './pages/login/Login'

const App = () => {

  const Layout = () => {
    return (
      <div className="main">
        <NavBar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
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
    },
    {
      path: '/login',
      element: <Login />
    }
  ]) 

  return (
    <RouterProvider router={router} />
  )
}

export default App
