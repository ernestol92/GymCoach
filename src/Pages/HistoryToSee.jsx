import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'
import { IconBarbell, IconTimeDuration60 } from '@tabler/icons-react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const HistoryToSee = () => {
  const { t } = useTranslation(); 
  return (
      
      <div className='start-page-column transparent'>
        <BackButton />

          <Link to="exerciseHistory" className='start-card card-fx'>
              <IconBarbell
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              
              <div className='text-div'>
                <h2 className='text-div'>{t('historyToSee.exerciseHistory')}</h2>
                <span className='text-div'>{t("start.historyDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="workoutHistory" className='start-card card-fx'>
              <IconTimeDuration60
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              
              <div className='text-div'>
                <h2 className='text-div'>{t('historyToSee.workoutHistory')}</h2>
                <span className='text-div'>{t("start.historyDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

          {/* <Link to="exerciseHistory" className='start-card card-fx'>{t('historyToSee.exerciseHistory')}</Link>
          <Link to="workoutHistory" className='start-card card-fx'>{t('historyToSee.workoutHistory')}</Link> */}
      </div>
  )
}

export default HistoryToSee