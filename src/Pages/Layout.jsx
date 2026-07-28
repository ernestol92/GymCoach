import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Toolbar from '../Components/Toolbar';
import Footer from '../Components/Footer';


const Layout = () => {
  return (
    <div className='wrapper'>
        <Navbar/>
        <main className='content carbon-bg'>
            <Outlet/>
            <Toolbar/>
        <Footer/>
            
        </main>
    </div>
  )
}

export default Layout;