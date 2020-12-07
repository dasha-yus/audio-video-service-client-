import React, {Component} from 'react'

import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.</p>
            </footer>
        )
    }
}