import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const HistoryToSee = () => {
  return (
      
      <div className='start-page-column'>
        <BackButton />
          <Link to="exerciseHistory" className='start-card card-fx'>Exercise History</Link>
          <Link to="workoutHistory" className='start-card card-fx'>Workout History</Link>
      </div>
  )
}

export default HistoryToSee