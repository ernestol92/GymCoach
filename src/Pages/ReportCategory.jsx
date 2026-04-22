import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const ReportCategory = () => {
  const {action} = useParams();
  const base = import.meta.env.BASE_URL;
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
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}UpperBody.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>
                Upper Body
            </Link>

            <Link 
              to="LowerBody"
              className='center-card card-fx'
              style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}LowerBody.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom"

                    }}>
                Lower Body
            </Link>


            <Link 
            to="Cardio"className='center-card card-fx'
            style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}running.png)`,
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