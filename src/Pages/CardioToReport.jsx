import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../db/db';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'

const CardioToReport = ({mode}) => {
    const { t } = useTranslation();
    const { group } = useParams();
    const [cardioTypes, setCardioTypes] = useState([]);

    useEffect(() => {
        if(!group) return;
        const fetchCardioExercises = async () => {
            const exercises = await db.exercises.where("type").equalsIgnoreCase(group).toArray();
            if(exercises.length === 0) return console.error("No exercises found for this group");
            console.log(exercises);
            const exerciseNames = exercises.map(x => x.exercise);
            setCardioTypes(exerciseNames);

        };
        fetchCardioExercises();
    },[group])


  return (
    <>
        <div className='start-page-column'>
            <div className='backBtn-and-title'>
                <BackButton/>
                <h2 className='breadCrumb'>
                {mode === "history"
                    ? t('group.historyTitle', { group: t(`keywords.${group.toLowerCase()}`) })
                    : t('group.reportTitle', { group: t(`keywords.${group.toLowerCase()}`) })}
                </h2>
            </div>
            <div className='exerciseList'>
                {cardioTypes.map((exercise) => (
                <Link key={exercise} to={`${exercise}`} className='exerciseListBtn'>{exercise}</Link>
                
                ))}
            </div>
        </div>
    </>
  )
}

export default CardioToReport