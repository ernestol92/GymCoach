import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'

const ReportCategory = () => {
  const {action} = useParams();
  const base = import.meta.env.BASE_URL;
  const { t } = useTranslation();
  return (
    <>
      <div className='start-page-column'>
        <div>
          <BackButton/>
          <h2 className='breadCrumb'>{action ? t('keywords.history') : t('keywords.report')}</h2>

        </div>
            <Link 
              to="UpperBody" 
              className='center-card card-fx' 
              style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}UpperBody.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>
                {t('keywords.upperbody')}
            </Link>

            <Link 
              to="LowerBody"
              className='center-card card-fx'
              style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}LowerBody.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom"

                    }}>
                {t('keywords.lowerbody')}
            </Link>


            <Link 
            to="Cardio"className='center-card card-fx'
            style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}running.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"

                  }}>
                {t('keywords.cardio')}
            </Link>
        
      </div>
    </>
  )
}

export default ReportCategory