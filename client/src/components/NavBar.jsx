import { useNavigate } from 'react-router-dom'

import { MdShoppingBasket } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"
import { RxAvatar } from "react-icons/rx"
import { CiLogout } from "react-icons/ci";
import useAuth from '../zustand/useAuth'
import useLogout from '../hooks/useLogout'
import useCart from '../zustand/useCart'

const NavBar = () => {

  const token = useAuth((state) => state.token)
  const cart = useCart((state) => state.cart)
  const navigate = useNavigate()

  const { loading, logout } = useLogout()

  return (
    <div className='flex justify-between items-center fixed top-0 bg-[#FFB200] w-full h-12 px-1 md:px-12'>
      {/* Left Section */}
      <div className='flex items-center gap-1 text-xl font-semibold cursor-pointer' onClick={() => navigate('/')}>
        {/* Title */}
        <MdShoppingBasket className='text-3xl' />
        Nest Cart
      </div>
      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* Cart  and Total Items */}
        {token && <div className='relative hover:bg-[#EB5B00] rounded-2xl'>
          <FaShoppingCart className="text-3xl" onClick={() => navigate('/cart')} />
          <div className='absolute bottom-0 right-0 flex justify-center items-center rounded-full bg-[#EB5B00] text-xs px-1'>{cart.length}</div>
        </div>}
        {/* Authentication and Profile */}
        {token ?
          <div className='flex justify-between items-center gap-1'>
            <RxAvatar className='text-3xl hover:bg-[#EB5B00] rounded-full transition-all' onClick={() => navigate('/profile')} />
            <button className='btn text-2xl' onClick={() => logout()}><CiLogout /></button>
          </div> :
          <div className='flex justify-between items-center gap-1'>
            <button className='btn' onClick={() => navigate('/login')}>Login</button>
            <button className='btn' onClick={() => navigate('/register')}>Register</button>
          </div>}
      </div>
    </div>
  )
}

export default NavBar
