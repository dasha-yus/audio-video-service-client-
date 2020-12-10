import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory()

    const login = () => history.push('/login')
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('userRole')
        localStorage.setItem('isAuth', false)
        localStorage.removeItem('x-auth-token')
        localStorage.removeItem('expiration')
        history.push('/')
    }

    if (userData.user) {
        if (userData.user.role === 'user') {
            return (
                <div className='dropdown'>
                    <Link to='#' className='nav-item'>PROFILE</Link>
                        <div className='dropdown-content'>
                            <Link to={`/user/${userData.user.id}/playlists`} className='nav-item'>PLAYLISTS</Link>
                            <Link onClick={logout} className='nav-item'>LOGOUT</Link>
                        </div>
                </div>
            )
        } else if (userData.user.role === 'admin') {
            return (
                <div className='dropdown'>
                    <Link to='#' className='nav-item'>PROFILE</Link>
                        <div className='dropdown-content'>
                            <Link to='/admin/users' className='nav-item'>USERS</Link>
                            <Link onClick={logout} className='nav-item'>LOGOUT</Link>
                        </div>
                </div>
            )
        } else return <Link onClick={login} className='nav-item'>LOGIN</Link>
    } else return <Link onClick={login} className='nav-item'>LOGIN</Link>
}