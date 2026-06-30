import React from 'react'
import {Link} from "react-router-dom";
import { LanguageIcon, HomeIcon} from '@heroicons/react/24/solid';
import { useState, useRef, useEffect, useMemo } from 'react'
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(false)
  const { t } = useTranslation();
  const messages = useMemo(() => {
    return t("coach.messages", { returnObjects: true });
  }, [t]);
  const [coachMessage, setCoachMessage] = useState("");
  const [showCoachMessage, setShowCoachMessage] = useState(false);


  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setSelected(language);
    setIsOpen(false);
  }

  useEffect(() => {
  if (!Array.isArray(messages) || messages.length === 0) return;

  let timeoutId;

  const showRandomMessage = () => {
    const random = messages[Math.floor(Math.random() * messages.length)];

    setCoachMessage(random);
    setShowCoachMessage(true);

    timeoutId = setTimeout(() => {
      setShowCoachMessage(false);
    }, 8000);
  };

  showRandomMessage();

  const intervalId = setInterval(showRandomMessage, 300000);

  return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
}, [messages]);

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
              <Link to="/" className='logo'>
                <img className='favicon' src="./favicon.png" alt="" />
                GYM COACH
              </Link>

              {showCoachMessage && (
                <div className="coach">
                  <p>{coachMessage}</p>
                </div>
              )}

              <div className='Navbar-icons'>
                {/* <Link to="/">
                  <HomeIcon className='icon-md primary-color'></HomeIcon>
                </Link> */}
                <button to="/inspiration" onClick={handleClick} className='language-btn'>
                  <LanguageIcon className='icon-sm primary-color'></LanguageIcon>
                </button>
              
              </div>
                
      </div>

      <div>
        {isOpen && (
          <div className='dropdown language-select-wrapper'>
            <button className='language-select' onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('sv')}>Svenska</button>
            <button className='language-select' onClick={() => handleLanguageChange('es')}>Español</button>
            <button onClick={() => handleLanguageChange('pt')}>Português</button>
          </div>
        )}
      </div>

    </div>
  )
}


export default Navbar
