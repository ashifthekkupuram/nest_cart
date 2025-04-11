import { useEffect } from 'react'
import './authWrapper.scss'

import useRefresh from '../../hooks/useRefresh'
import { Outlet } from 'react-router-dom'

const AuthWrapper = () => {

    const { loading, refresh } = useRefresh()

    useEffect(() => {
        refresh()
    }, [])

    return (
        loading ? <div className='authLoading'>Loading...</div> : <Outlet />
    )
}

export default AuthWrapper
