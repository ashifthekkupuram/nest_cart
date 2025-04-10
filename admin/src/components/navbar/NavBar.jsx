import './navbar.scss'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src="cart-logo.svg" alt="" />
        <span>Nest Cart Admin</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="user.svg" alt="" />
          <span>User</span>
        </div>
        <img src="settings.svg" alt="" />
      </div>
    </div>
  )
}

export default NavBar
