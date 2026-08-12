import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronUpIcon, ChartBarSquareIcon, PlusCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
const Toolbar = () => {

  const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
        
      <div className='toolbar-wrapper'>
          <button className='toolbar-button' onClick={handleClick}>
            {isOpen ? <ChevronDownIcon className='icon-sm footer-icon'/> : <ChevronUpIcon className='icon-md footer-icon'/>}
          </button>

        {isOpen &&
        <div className='toolbar'>
          <Link to="/" className='footer-link'><HomeIcon className='icon-md footer-icon' /><span>HOME</span></Link>
          <Link to="/reportCategory" className='footer-link'><ChartBarSquareIcon className='icon-md footer-icon'/><span>REPORT</span></Link>
          <Link to="/add" className='footer-link'><PlusCircleIcon className='icon-md footer-icon'/><span>ADD</span></Link>
          <Link to="/history" className='footer-link'><ArrowPathRoundedSquareIcon className='icon-md footer-icon'/><span>HISTORY</span></Link>
          <Link to="/timer" className='footer-link'><ClockIcon className='icon-md footer-icon'/><span>TIMER</span></Link>
        </div>}

      </div>
      
    </>
  )
}

export default Toolbar