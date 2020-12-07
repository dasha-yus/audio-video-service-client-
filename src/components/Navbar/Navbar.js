import React, { Component } from "react"
import AuthOptions from '../Auth/AuthOptions'
import NavbarOptions from './NavbarOptions'
import LogoOptions from './LogoOptions'

import './Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <header>
          <div className='header'>  
            <div>
              <LogoOptions />
            </div>
            <div>
              <NavbarOptions />
              <AuthOptions to="/login" className='nav-item'>LOGIN</AuthOptions>
            </div>
          </div>
      </header>
    )
  }
}