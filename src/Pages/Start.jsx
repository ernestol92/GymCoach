import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ChartBarSquareIcon, PlusCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next'


const Start = () => {
  const { t } = useTranslation()

  return (
    <div className='container'>
      <div className='start-page-column'>

            <div className='banner'>
              <h1 className='start-title text-div transparent'>{t("welcome.title")}<span className='orbitron-font white-color transparent'>{t("welcome.title2")}</span></h1>
              <p className='start-subtitle transparent'>{t("welcome.description")}</p>
              {/* Ready to level up today?
                Let’s build something strong.
                Show up. Put in the work.
                One workout closer to your goal.
                Discipline starts now. */}
            </div>

            <Link to="reportCategory" className='start-card card-fx'>
              <ChartBarSquareIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>{t("start.report")}</h2>
                <span className='text-div'>{t("start.reportDesc")}</span>
              </div>
            </Link>

            <Link to="addExercise" className='start-card card-fx'>
              <PlusCircleIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>{t("start.addExercise")}</h2>
                <span className='text-div'>{t("start.addExerciseDesc")}</span>
              </div>
            </Link>

            <Link to="timer" className='start-card card-fx'>
              <ClockIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>{t("start.timer")}</h2>
                <span className='text-div'>{t("start.timerDesc")}</span>
              </div>
            </Link>

            <Link to="history" className='start-card card-fx'>
              <ArrowPathRoundedSquareIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>{t("start.history")}</h2>
                <span className='text-div'>{t("start.historyDesc")}</span>
              </div>
            </Link>

            <Link to="exportImport" className='start-card card-fx'>
              <ArrowUpOnSquareIcon className="icon-md text-div" />
              <div className='text-div'>
                <h2 className='text-div'>{t("start.export")}</h2>
                <span className='text-div'>{t("start.exportDesc")}</span>
              </div>
            </Link>

             

        </div>
    </div>
  )
}

export default Start