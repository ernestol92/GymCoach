import React from 'react'
import {Link} from "react-router-dom";
import { LightBulbIcon, HomeIcon} from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <div className='header'>
            <Link to="/" className='logo'>GYM COACH</Link>


            <div className='Navbar-icons'>
              <Link to="/">
                <HomeIcon className='icon-md primary-color'></HomeIcon>
              </Link>
              <Link to="/inspiration">
                <LightBulbIcon className='icon-md primary-color'></LightBulbIcon>
              </Link>
            
            </div>
              
    </div>
  )
}

export default Navbar
