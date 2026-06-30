import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ChartBarSquareIcon, PlusCircleIcon, ClockIcon, RectangleStackIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon, ArrowRightIcon  } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next'
import { IconReport, IconClipboardPlus, IconTimeDuration15, IconHistory, IconDatabaseExport, IconCashEdit } from "@tabler/icons-react";


const Start = () => {
  const { t } = useTranslation()

  return (
    <div className='container'>
      <div className='start-page-column start-bg'>

            <div className='banner mt'>
              <h1 className='start-title text-div transparent'>{t("welcome.title")}<span className='orbitron-font white-color transparent'>{t("welcome.title2")}</span></h1>
              <p className='start-subtitle transparent'>{t("welcome.description")}</p>
              {/* Ready to level up today?
                Let’s build something strong.
                Show up. Put in the work.
                One workout closer to your goal.
                Discipline starts now. */}
            </div>

            <Link to="reportCategory" className='start-card card-fx'>
              <IconReport
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <ChartBarSquareIcon className="text-div icon-xl" />
              </div>
              <div className='text-div'>
                <h2 className='text-div'>{t("start.report")}</h2>
                <span className='text-div'>{t("start.reportDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="addExercise" className='start-card card-fx'>
              <IconClipboardPlus
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <PlusCircleIcon className="text-div icon-xl" />
              </div>
              <div className='text-div'>
                <h2 className='text-div'>{t("start.addExercise")}</h2>
                <span className='text-div'>{t("start.addExerciseDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="timer" className='start-card card-fx'>
              <IconTimeDuration15
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <ClockIcon className="text-div icon-xl" />
                </div>
              <div className='text-div'>
                <h2 className='text-div'>{t("start.timer")}</h2>
                <span className='text-div'>{t("start.timerDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="#" className='start-card card-fx'>
              <IconCashEdit
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <RectangleStackIcon className="text-div icon-xl" />
                </div>
              <div className='text-div'>
                <h2 className='text-div'>{t("start.library")}</h2>
                <span className='text-div'>{t("start.libraryDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="history" className='start-card card-fx'>
              <IconHistory
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <ArrowPathRoundedSquareIcon className="text-div icon-xl" />
              </div>
              <div className='text-div'>
                <h2 className='text-div'>{t("start.history")}</h2>
                <span className='text-div'>{t("start.historyDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="exportImport" className='start-card card-fx'>
              <IconDatabaseExport
                size={170}
                stroke={1}
                className="start-card-bg"
              />
              <div className='text-div'>
                <ArrowUpOnSquareIcon className="text-div icon-xl" />
              </div>
              
              <div className='text-div'>
                <h2 className='text-div'>{t("start.export")}</h2>
                <span className='text-div'>{t("start.exportDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
              
            </Link>

             

        </div>
    </div>
  )
}

export default Start