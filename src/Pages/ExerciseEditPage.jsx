import React, { useEffect, useState } from 'react'
import BackButton from '../Components/BackButton'
import { db } from '../db/db'
import { useTranslation } from 'react-i18next'
import { IconPoint, IconEdit } from "@tabler/icons-react";

const ExerciseEditPage = () => {
    const { t } = useTranslation();
    const [muscleGroups, setMuscleGroups] = useState([]);

    useEffect(()=>{

        const fetchExercises = async ()=>{
            const muscles = await db.muscles.toArray()

            const result = [];

            for(const muscle of muscles){
                const pivotRows = await db.exerciseMuscles
                    .where('muscle_id')
                    .equals(muscle.id)
                    .toArray();

                const exerciseIds = pivotRows.map(row => row.exercise_id);

                const exercises = await db.exercises.bulkGet(exerciseIds);
                result.push({
                    muscle: muscle.muscle,
                    exercises: exercises.filter(Boolean)
                });
            }

            setMuscleGroups(result);

        }

        fetchExercises();
    },[])

  return (
    <div className='start-page-column transparent'>
        <div className='transparent'>
            <BackButton/>
            <h2 className='breadCrumb transparent'>
                Edit Exercise
            </h2>
        </div>


        <div className='exercise-edit-list transparent'>
            
            {muscleGroups.map( group => (
                <ul key={group.muscle} className='transparent'>
                    <h3 className='transparent mb mt uppercase'>{group.muscle}</h3>
                    {group.exercises.map(exercise => (
                        (exercise.isCustom ? 
                        (<li className='transparent li mb' key={exercise.id}>
                            <div className='transparent li'>
                                <IconPoint
                                    size={25}
                                    stroke={1}
                                    className='list-bullet'
                                />
                                {exercise.exercise}
                            </div>
                            <button className='list-btn'>
                                <IconEdit
                                    size={20}
                                    stroke={1}
                                />
                            </button>
                        </li>)
                        : 
                        (<li className='transparent li mb' key={exercise.id}>
                            <div className='transparent li'>
                                <IconPoint
                                    size={25}
                                    stroke={1.5}
                                    className='list-bullet'
                                />
                                {t(`exercises.${exercise.exerciseKey}`)}
                            </div>
                            
                            <button className='list-btn'>
                                <IconEdit
                                    size={20}
                                    stroke={1.5}
                                />
                            </button>
                        </li>))
                    ))}
                </ul>
                
            ))}
            
        </div>
    </div>
  )
}

export default ExerciseEditPage
