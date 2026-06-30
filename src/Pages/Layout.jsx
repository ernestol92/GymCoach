import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Layout = () => {
  return (
    <div className='wrapper'>
        <Navbar/>
        <main className='content carbon-bg'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout;