import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CreateExerciseLinkBtn = () => {
  const { t } = useTranslation();
  return (
    <Link to="/addExercise" className='add-btn'>
      {t('createExerciseBtn')}
    </Link>
  )
}

export default CreateExerciseLinkBtn