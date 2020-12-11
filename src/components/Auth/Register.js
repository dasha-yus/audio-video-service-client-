import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import ErrorNotice from '../errors/ErrorNotice'
import { postItems } from '../../service/CRUDService'

import './Auth.css'

export default function Register() {
  const [error, setError] = useState()

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: ''
  })

  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    
    try {
      const newUser = {...form}
      await postItems('users/register', newUser, false)
      alert('A new user account was successfully created')
      history.push('/login')
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className='align'>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <div className='card'>
            <div className='head'>
                <div></div>
                <Link to='/login' id='login'>Login</Link>
                <Link to='/register' className='selected' id='register'>Register</Link>
                <Link to='/'>Home</Link>
                <div></div>
            </div>
            <form onSubmit={submit}>
                <div className='inputs'>
                    <div className='input'>
                        <input
                          placeholder="Username"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={changeHandler}
                        />
                        <i className='fas fa-user'></i>
                    </div>
                    <div className='input'>
                        <input
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={changeHandler}
                        />
                        <i class="fas fa-at"></i>
                    </div>
                    <div className='input'>
                        <input
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={changeHandler}
                        />
                        <i className='fas fa-lock'></i>
                    </div>
                    <div className='input'>
                        <input
                          placeholder="Confirm password"
                          type="password"
                          name="passwordCheck"
                          value={form.passwordCheck}
                          onChange={changeHandler}
                        />
                        <i className='fas fa-lock'></i>
                    </div>
                </div>
                <button>Register</button>
            </form>
        </div>
    </div>
  )
}