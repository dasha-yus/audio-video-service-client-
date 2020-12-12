import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function NavbarOptions() {
    const { userData } = useContext(UserContext)

    return (
        <span>
            {userData.user ? (
                <span>
                    {userData.user.role === 'admin'  ? (
                        <Link to="/admin" className='logo'><span id='smart'>SMART</span>SERVICE</Link>
                    ) : (
                        <Link to="/" className='logo'><span id='smart'>SMART</span>SERVICE</Link>
                    )}
                </span>
            ) : (
                <Link to="/" className='logo'><span id='smart'>SMART</span>SERVICE</Link>
            )}
        </span>
    )
}