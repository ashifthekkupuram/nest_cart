import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from '../navbar/NavBar'
import Menu from '../menu/Menu'

import useAuth from '../../zustand/useAuth'

const Layout = () => {

    const navigate = useNavigate()
    const token = useAuth((state) => state.token)

    if(!token){
        navigate('/login')
    }

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
            <Toaster position='top-right' reverseOrder={false} />
        </div>
    )
}

export default Layout