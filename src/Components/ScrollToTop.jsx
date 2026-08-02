import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom' 
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(()=>{
        const main = document.getElementById("main-content");

        if(main){
            main.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
    }, [pathname])
  return (
    <div>
      
    </div>
  )
}

export default ScrollToTop
