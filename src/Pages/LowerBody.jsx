import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'

const LowerBody = ({ mode }) => {
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
            to="Quads" 
            className="card card-fx"
            style={{
                                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/quads.png)`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>{t("keywords.quads")}</Link>

          <Link 
            to="Hamstring" 
            className="card card-fx"
            style={{
                                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/hamstring.png)`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>{t("keywords.hamstrings")}</Link>

          <Link 
            to="Glutes" 
            className="card card-fx"
            style={{
                                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/glutes.png)`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>{t("keywords.glutes")}</Link>

          <Link 
            to="Calves" 
            className="card card-fx"
            style={{
                                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${base}specificMuscle/calves.png)`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
            
                                }}>{t("keywords.calves")}</Link>
    
        </div>
      </div>
    </>
  )
}

export default LowerBody