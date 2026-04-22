import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ChartBarSquareIcon, PlusCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';

const Start = () => {


  return (
    <div className='container'>
      <div className='start-page-column'>

            <div className='banner'>
              <h1 className='start-title text-div transparent'>Ready to <span className='orbitron-font white-color transparent'>crush it?</span></h1>
              <p className='start-subtitle transparent'>Your personal workout companion</p>
              {/* Ready to level up today?
                Let’s build something strong.
                Show up. Put in the work.
                One workout closer to your goal.
                Discipline starts now. */}
            </div>

            <Link to="reportCategory" className='start-card card-fx'>
              <ChartBarSquareIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>Report</h2>
                <span className='text-div'>Log the current exercise you are performing</span>
              </div>
            </Link>

            <Link to="addExercise" className='start-card card-fx'>
              <PlusCircleIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>Add Exercise</h2>
                <span className='text-div'>Add a new exercise to your workout catalog</span>
              </div>
            </Link>

            <Link to="timer" className='start-card card-fx'>
              <ClockIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>Timer</h2>
                <span className='text-div'>Set a timer for your exercise</span>
              </div>
            </Link>

            <Link to="history" className='start-card card-fx'>
              <ArrowPathRoundedSquareIcon className="icon-lg text-div" />
              <div className='text-div'>
                <h2 className='text-div'>History</h2>
                <span className='text-div'>View your workout history</span>
              </div>
            </Link>

            <Link to="exportImport" className='start-card card-fx'>
              <ArrowUpOnSquareIcon className="icon-md text-div" />
              <div className='text-div'>
                <h2 className='text-div'>Export Data</h2>
                <span className='text-div'>Export your workout data to your device</span>
              </div>
            </Link>

             

        </div>
    </div>
  )
}

export default Start