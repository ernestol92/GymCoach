import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const ReportCategory = () => {
  const {action} = useParams();
  return (
    <>
      <div className='flex-col'>
        <div className='backBtn-and-title'>
          <BackButton/>
          <h2 className='breadCrumb'>{action ? "History" : "Report"}</h2>

        </div>
        <div className='start-page-column'>
            <Link 
              to="UpperBody" 
              className='center-card card-fx' 
              style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/UpperBody.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>
                Upper Body
            </Link>

            <Link 
              to="LowerBody"
              className='center-card card-fx'
              style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/LowerBody.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom"

                    }}>
                Lower Body
            </Link>


            <Link 
            to="Cardio"className='center-card card-fx'
            style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/running.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"

                  }}>
                Cardio
            </Link>
        </div>
      </div>
    </>
  )
}

export default ReportCategory