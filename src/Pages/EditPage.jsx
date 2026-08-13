import React from 'react'
import BackButton from '../Components/BackButton.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { IconBarbell, IconCashEdit } from '@tabler/icons-react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';


const EditPage = () => {
  const { t } = useTranslation();
  return (
    <div className='transparent start-page-column'>
      <div className='backBtn-and-title transparent'>
          <BackButton/>
      </div>

      {/*  Add buttons for adding exercise and adding program */}

      <Link to="exerciseLibrary" className='start-card card-fx'>
              <IconBarbell
                size={140}
                stroke={1}
                className="start-card-bg"
              />
              
              <div className='text-div'>
                <h2 className='text-div'>{t('library.editExercise')}</h2>
                <span className='text-div'>{t("library.editExerciseDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>

            <Link to="programLibrary" className='start-card card-fx'>
              <IconCashEdit
                size={140}
                stroke={1}
                className="start-card-bg"
              />
              
              <div className='text-div'>
                <h2 className='text-div'>{t('library.editProgram')}</h2>
                <span className='text-div'>{t("library.editProgramDesc")}</span>
              </div>
              <div className='text-div'>
                <ArrowRightIcon className="text-div icon-sm" />
              </div>
            </Link>
      
    </div>
  )
}

export default EditPage


