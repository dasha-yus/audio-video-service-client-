import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function NavbarOptions() {
    const {userData, setUserData} = useContext(UserContext)

    return (
        <span>
            {userData.user ? (
                <span>
                    {userData.user.role === 'admin'  ? (
                        <span>
                            <Link to="/admin" className='nav-item'>VIDEO</Link>
                            <Link to="/admin/audio" className='nav-item'>AUDIO</Link>
                        </span>
                    ) : (
                        <span>
                            <Link to="/" className='nav-item'>VIDEO</Link>
                            <Link to="/audio" className='nav-item'>AUDIO</Link>
                        </span>
                    )}
                </span>
            ) : (
                <span>
                    <Link to="/" className='nav-item'>VIDEO</Link>
                    <Link to="/audio" className='nav-item'>AUDIO</Link>
                </span>
            )}
        </span>
    )
}