import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const UpperBody = ({ mode }) => {
  return (
    <>
      <div className='flex-col'>
        <div className='backBtn-and-title'>
          <BackButton/>
          <h2 className='breadCrumb'>{mode === "history" ? "History" : "Report"}</h2>

        </div>
        <div className='grid'>
          <Link 
            to="Chest" 
            className="card card-fx"
            style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/chest.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Chest</Link>

          <Link 
            to="Back" 
            className="card card-fx"
            style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/back.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Back</Link>

          <Link 
            to="Shoulders" 
            className="card card-fx"
            style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/shoulders.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Shoulders</Link>

          <Link 
            to="Arms" 
            className="card card-fx"
            style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/arms.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Arms</Link>

          <Link 
            to="Core" 
            className="card card-fx"
            style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/specificMuscle/core.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Core</Link>

        </div>

      </div>
    </>
  )
}

export default UpperBody