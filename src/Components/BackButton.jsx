import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <button 
        onClick={handleBack} 
        style={{ 
            width: '45px',
            height: '45px',
            backgroundImage: 'url("/icons/chevron-left-white.svg")', 
            backgroundSize: '20px 20px', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center',
            borderRadius: '8px', 
            
            }}>
      </button>
    </div>
  )
}

export default BackButton