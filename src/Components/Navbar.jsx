import React from 'react'
import {Link} from "react-router-dom";
import { LanguageIcon, HomeIcon} from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react'
import i18n from '../i18n';

const Navbar = () => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setSelected(language);
    setIsOpen(false);
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [])


  return (
    <div ref={dropdownRef}>
      <div className='header'>
              <Link to="/" className='logo'>GYM COACH</Link>


              <div className='Navbar-icons'>
                <Link to="/">
                  <HomeIcon className='icon-md primary-color'></HomeIcon>
                </Link>
                <button to="/inspiration" onClick={handleClick} className='language-btn'>
                  <LanguageIcon className='icon-md primary-color'></LanguageIcon>
                </button>
              
              </div>
                
      </div>

      <div>
        {isOpen && (
          <div className='dropdown'>
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('sv')}>Svenska</button>
            <button onClick={() => handleLanguageChange('es')}>Español</button>
            <button onClick={() => handleLanguageChange('pt')}>Português</button>
          </div>
        )}
      </div>

    </div>
  )
}


export default Navbar
