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
        console.log(filteredExercises);

        const exerciseNames = filteredExercises.map(x => x.exercise);
        setExercises(exerciseNames);
        }

        fetchExercises();

    },[group])
    
  return (
    <>
        <div className='start-page-column'>
            <div>
                <BackButton/>
                <h2 className='breadCrumb'>
                    {mode === "history"
                        ? t('group.historyTitle', { group: t(`keywords.${group.toLowerCase()}`) })
                        : t('group.reportTitle', { group: t(`keywords.${group.toLowerCase()}`) })}
                </h2>
            </div>
            <div className='exerciseList'>
                {(!exercises || exercises.length === 0) &&
                <>
                    <p>{t('group.notFound')}</p>
                    <CreateExerciseLinkBtn/>
                </> 
                }
                {exercises.map((exercise) => (
                <Link key={exercise} to={`${exercise}`} className='exerciseListBtn'>{exercise}</Link>
                
                ))}
            </div>

        </div>
    </>
  )
}

export default ExerciseToReport