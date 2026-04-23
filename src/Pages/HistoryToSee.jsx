import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'

const HistoryToSee = () => {
  const { t } = useTranslation(); 
  return (
      
      <div className='start-page-column'>
        <BackButton />
          <Link to="exerciseHistory" className='start-card card-fx'>{t('historyToSee.exerciseHistory')}</Link>
          <Link to="workoutHistory" className='start-card card-fx'>{t('historyToSee.workoutHistory')}</Link>
      </div>
  )
}

export default HistoryToSee