import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <Link className='footer-link' to='/'>
        About
      </Link>
      <Link className='footer-link' to='/'>
        © 2024 Workout Tracker. All rights reserved.
      </Link>
    </div>
  )
}

export default Footer
