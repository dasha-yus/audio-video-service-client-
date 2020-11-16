import React, {useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext)

    const history = useHistory()

    const login = () => history.push('/login')
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        history.push('/')
    }

    return (
        <span>
            {userData.user ? (
                <div className='dropdown'>
                    <Link to='#' className='nav-item'>PROFILE</Link>
                    {userData.user.role === 'user' ? (
                        <div className='dropdown-content'>
                            <Link to={`/user/${userData.user.id}/playlists`} className='nav-item'>PLAYLISTS</Link>
                            <Link onClick={logout} className='nav-item'>LOGOUT</Link>
                        </div>
                    ) : (
                        <div className='dropdown-content'>
                            <Link to='/admin/users' className='nav-item'>USERS</Link>
                            <Link onClick={logout} className='nav-item'>LOGOUT</Link>
                        </div>
                    )}
                </div>
            ) : (
                <Link onClick={login} className='nav-item'>LOGIN</Link>
            )}
        </span>
    )
}