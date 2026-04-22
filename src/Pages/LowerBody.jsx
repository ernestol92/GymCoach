import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const LowerBody = ({ mode }) => {
  return (
    <>
      <div className='flex-col'>
        <div className='backBtn-and-title'>
          <BackButton/>
          <h2 className='breadCrumb'>{mode === "history" ? "History" : "Report"}</h2>

        </div>
        <div className='grid'>
          <Link 
            to="Quads" 
            className="card card-fx"
            style={{
                                  backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/quads.png')",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>Quads</Link>

          <Link 
            to="Hamstring" 
            className="card card-fx"
            style={{
                                  backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/hamstring.png')",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>Hamstring</Link>

          <Link 
            to="Glutes" 
            className="card card-fx"
            style={{
                                  backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/glutes.png')",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>Glutes</Link>

          <Link 
            to="Calves" 
            className="card card-fx"
            style={{
                                  backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/calves.png')",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>Calves</Link>
    
        </div>
      </div>
    </>
  )
}

export default LowerBody