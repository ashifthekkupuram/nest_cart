import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'

const NavWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default NavWrapper
