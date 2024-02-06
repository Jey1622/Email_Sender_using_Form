import '../App.css'

import React from 'react'

export default function Popup({msg,resetForm}) {
  return (
    <div className='popup'>
        <div className='popup-content'>
            <span className='popup-msg'>{msg}</span>
            <span className='close' onClick={resetForm}>X</span>
        </div>
    </div>
  )
}
