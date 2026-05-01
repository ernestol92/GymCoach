import React from 'react'
import { NavLink } from 'react-router-dom';
import { ChartBarSquareIcon, PlusCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon, HomeIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className='footer'>
          <NavLink to="/" className='footer-link'><HomeIcon className='icon-md footer-icon'/><span>HOME</span></NavLink>
          <NavLink to="/reportCategory" className='footer-link'><ChartBarSquareIcon className='icon-md footer-icon'/><span>REPORT</span></NavLink>
          <NavLink to="/addExercise" className='footer-link'><PlusCircleIcon className='icon-md footer-icon'/><span>ADD</span></NavLink>
          <NavLink to="/history" className='footer-link'><ArrowPathRoundedSquareIcon className='icon-md footer-icon'/><span>HISTORY</span></NavLink>
          <NavLink to="/timer" className='footer-link'><ClockIcon className='icon-md footer-icon'/><span>TIMER</span></NavLink>
    </footer>
  )
}

export default Footer