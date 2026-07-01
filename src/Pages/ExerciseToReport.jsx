import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../db/db';
import BackButton from '../Components/BackButton';
import CreateExerciseLinkBtn from '../Components/CreateExerciseLinkBtn';
import { useTranslation } from 'react-i18next'

const ExerciseToReport = ({ mode }) => {
    const { group } = useParams();
    const { t } = useTranslation();

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if(!group) return;

        const fetchExercises = async ()=> {
        //Get muscle row
        const muscle = await db.muscles.where("muscle").equalsIgnoreCase(group).first();
        if(!muscle) return console.error("Muscle not found");

        //Get exerciseMuscle rows and exerciseIdsList
        const exerciseMuscles = await db.exerciseMuscles.where("muscle_id").equals(muscle.id).toArray();
        const exerciseIds = exerciseMuscles.map(x => x.exercise_id);

        //Get exercises
        const exercises = await db.exercises.bulkGet(exerciseIds);
        
        const filteredExercises = exercises.filter(x => x !== undefined);

        setExercises(filteredExercises);
        }

        fetchExercises();

    },[group])
    
  return (
    <>
        <div className='start-page-column transparent'>
            <div className='transparent'>
                <BackButton/>
                <h2 className='breadCrumb transparent'>
                    {mode === "history"
                        ? t('group.historyTitle', { group: t(`keywords.${group.toLowerCase()}`) })
                        : t('group.reportTitle', { group: t(`keywords.${group.toLowerCase()}`) })}
                </h2>
            </div>
            <div className='exerciseList transparent'>
                {(!exercises || exercises.length === 0) &&
                <>
                    <p className='transparent'>{t('group.notFound')}</p>
                    <CreateExerciseLinkBtn/>
                </> 
                }
                {exercises.map((exercise) => {
                    const displayName = exercise.isCustom
                        ? exercise.exercise
                        : t(`exercises.${exercise.exerciseKey}`);
                    
                    const routeValue = exercise.exerciseKey;

                    return (
                        <Link key={exercise.id} to={`${routeValue}`} className='exerciseListBtn'>{displayName}</Link>
                    );
                })}
            </div>

        </div>
    </>
  )
}

export default ExerciseToReport