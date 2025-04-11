import './navbar.scss'

import useAuth from '../../zustand/useAuth'
import useLogout from '../../hooks/useLogout'

const NavBar = () => {

  const UserData = useAuth((state) => state.UserData)
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='navbar'>
      <div className="logo">
        <img src="cart-logo.svg" alt="" />
        <span>Nest Cart Admin</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="user.svg" alt="" />
          <span>{UserData?.name?.firstName || 'User'}</span>
        </div>
        <img src="settings.svg" alt="" />
        <img onClick={handleLogout} src="logout.svg" alt="" />
      </div>
    </div>
  )
}

export default NavBar
