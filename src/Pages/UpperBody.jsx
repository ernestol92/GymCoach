import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const UpperBody = ({ mode }) => {
  const base = import.meta.env.BASE_URL;
  return (
    <>
      <div className='start-page-column'>
      <div className='backBtn-and-title'>
        <BackButton/>
        <h2 className='breadCrumb'>{mode === "history" ? "History" : "Report"}</h2>

      </div>
        <div className='grid'>
          <Link 
            to="Chest" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/chest.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Chest</Link>

          <Link 
            to="Back" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/back.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Back</Link>

          <Link 
            to="Shoulders" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/shoulders.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Shoulders</Link>

          <Link 
            to="Arms" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/arms.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Arms</Link>

          <Link 
            to="Core" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/core.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>Core</Link>

        </div>

      </div>
    </>
  )
}

export default UpperBody