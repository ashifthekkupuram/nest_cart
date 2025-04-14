import { useEffect } from 'react'
import './authWrapper.scss'
import ClipLoader from 'react-spinners/ClipLoader'

import useRefresh from '../../hooks/useRefresh'
import { Outlet } from 'react-router-dom'

const AuthWrapper = () => {

    const { loading, refresh } = useRefresh()

    useEffect(() => {
        refresh()
    }, [])

    return (
        loading ? <div className='authLoading'><ClipLoader color='white' size={64} /></div> : <Outlet />
    )
}

export default AuthWrapper
