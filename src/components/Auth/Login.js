import React, {useContext, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../errors/ErrorNotice'
import { postItems } from '../../service/CRUDService'
import './Auth.css'

export default function Login() {
  const [error, setError] = useState()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { setUserData } = useContext(UserContext)
  const history = useHistory()
  const submit = async (e) => {
    e.preventDefault()

    try {
      const loginRes = await postItems('users/login', { ...form }, false)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      })
      localStorage.setItem('userId', loginRes.data.user.id)
      localStorage.setItem('username', loginRes.data.user.name)
      localStorage.setItem('userRole', loginRes.data.user.role)
      localStorage.setItem('x-auth-token', loginRes.data.token)
      localStorage.setItem('isAuth', true)

      if (loginRes.data.user.role === 'admin') {
        history.push("/admin")
      } else {
        history.push("/")
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className='align login'>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div className='card'>
          <div className='head'>
              <div></div>
              <Link to='/login' id='login' className='selected'>Login</Link>
              <Link to='/register' id='register'>Register</Link>
              <Link to='/'>Home</Link>
              <div></div>
          </div>
          <form onSubmit={submit}>
              <div className='inputs'>
                  <div className='input'>
                      <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={ form.email }
                        onChange={ changeHandler }
                      />
                      <i className="fas fa-at"></i>
                  </div>
                  <div className='input'>
                      <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={ form.password }
                        onChange={ changeHandler }
                      />
                      <i className='fas fa-lock'></i>
                  </div>
              </div>
              <button>Login</button>
          </form>
      </div>
  </div>
  )
}