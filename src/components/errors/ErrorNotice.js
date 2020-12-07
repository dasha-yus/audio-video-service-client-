import React from 'react'

import '../Auth/Auth.css'

export default function ErrorNotice(props) {
    return (
        <div className='error-notice'>
            <span id='error-msg'>{ props.message }</span>
            <button onClick={ props.clearError } id='error-btn'>OK</button>
        </div>
    )
}