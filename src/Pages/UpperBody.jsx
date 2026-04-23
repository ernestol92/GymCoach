import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'

const UpperBody = ({ mode }) => {
  const { t } = useTranslation();
  const base = import.meta.env.BASE_URL;
  return (
    <>
      <div className='start-page-column'>
      <div className='backBtn-and-title'>
        <BackButton/>
        <h2 className='breadCrumb'>{mode === "history" ? t('keywords.history') : t('keywords.report')}</h2>

      </div>
        <div className='grid'>
          <Link 
            to="Chest" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/chest.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>{t('keywords.chest')}</Link>

          <Link 
            to="Back" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/back.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>{t('keywords.back')}</Link>

          <Link 
            to="Shoulders" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/shoulders.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>{t('keywords.shoulders')}</Link>

          <Link 
            to="Arms" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/arms.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>{t('keywords.arms')}</Link>

          <Link 
            to="Core" 
            className="card card-fx"
            style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/core.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"

                    }}>{t('keywords.core')}</Link>

        </div>

      </div>
    </>
  )
}

export default UpperBody