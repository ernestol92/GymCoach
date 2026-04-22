import React from 'react'
import { Link } from 'react-router-dom'

const CreateExerciseLinkBtn = () => {
  return (
    <Link to="/addExercise" className='add-btn'>
      Create Exercise
    </Link>
  )
}

export default CreateExerciseLinkBtn