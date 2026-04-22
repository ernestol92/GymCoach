import React from 'react'
import { Link } from 'react-router-dom'
import { ChartBarSquareIcon, PlusCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon, HomeIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className='footer'>
          <Link to="/" className='footer-link'><HomeIcon className='icon-md footer-icon'/><span>HOME</span></Link>
          <Link to="/reportCategory" className='footer-link'><ChartBarSquareIcon className='icon-md footer-icon'/><span>REPORT</span></Link>
          <Link to="/history" className='footer-link'><ArrowPathRoundedSquareIcon className='icon-md footer-icon'/><span>HISTORY</span></Link>
          <Link to="/addExercise" className='footer-link'><PlusCircleIcon className='icon-md footer-icon'/><span>ADD</span></Link>
          <Link to="/timer" className='footer-link'><ClockIcon className='icon-md footer-icon'/><span>TIMER</span></Link>
    </footer>
  )
}

export default Footer