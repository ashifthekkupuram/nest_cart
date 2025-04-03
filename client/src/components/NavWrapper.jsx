import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from './NavBar'
import useRefresh from '../hooks/useRefresh'

const NavWrapper = () => {

  const { loading, error, refresh } = useRefresh()

  useEffect(()=>{
    refresh()
  },[])

  return (
    <div className='h-screen w-full pt-12 z-10'>
      <NavBar />
      <Outlet />
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default NavWrapper
