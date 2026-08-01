import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Toolbar from '../Components/Toolbar';
import Footer from '../Components/Footer';


const Layout = () => {
  const location = useLocation();

  const isHome =
    location.pathname === '/';

    console.log(location.pathname)

  return (
    <div className='wrapper'>
        <Navbar/>
        <main className={`content ${isHome ? 'start-bg' : 'carbon-bg'}`} >
              <Outlet/>
              <Toolbar/>
              <Footer/>
        </main>
    </div>
  )
}

export default Layout;