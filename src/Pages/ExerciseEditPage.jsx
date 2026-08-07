import React, { useEffect, useState } from 'react';
import BackButton from '../Components/BackButton';
import { db } from '../db/db';
import { useTranslation } from 'react-i18next';
import { IconPoint, IconEdit, IconTrash } from "@tabler/icons-react";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { createExerciseKey } from '../helpers/createExerciseKey.jsx';

const ExerciseEditPage = () => {
    const { t } = useTranslation();
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    const [editingExercise, setEditingExercise] = useState(null);
    const [exerciseName, setExerciseName] = useState("");


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
    },[isEditOpen]);

    //im not sure if isEditOpen should be triggering a re-render of the page, but it seems to be working fine for now.
    const toggleEditClick = (exercise) => {
        setEditingExercise(exercise);
        setExerciseName(exercise.exercise);
        setIsEditOpen(isEditOpen => !isEditOpen);
        // Handle the edit button click event here
    }

    const closeEditModal = () => {
        setIsEditOpen(false);
        setEditingExercise(null);
        setExerciseName("");
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = exerciseName.trim();

        if (!editingExercise || !trimmedName) return;
        console.log(trimmedName)

        await db.exercises.update(editingExercise.id, {
            exerciseKey: createExerciseKey(trimmedName),
            exercise: trimmedName
        });

        closeEditModal();
    };

    const handleDeleteExercise = async (exercise) => {
        await db.exercises.delete(exercise.id);
        // Optionally, you can also remove the exercise from the muscleGroups state to update the UI immediately
        setMuscleGroups(prevGroups => prevGroups.map(group => ({
            ...group,
            exercises: group.exercises.filter(ex => ex.id !== exercise.id)
        })));
    } 


  return (
    <div className='start-page-column transparent relative'>
        <div className='transparent'>
            <BackButton/>
            <h2 className='breadCrumb transparent'>
                Edit Exercise
            </h2>
        </div>


        <div className='exercise-edit-list transparent'>
            
            {muscleGroups.map( group => (
                <ul key={group.muscle} className='transparent'>
                    <h3 className='transparent mb mt uppercase title-color'>{group.muscle}</h3>
                    {group.exercises.map(exercise => (
                        (exercise.isCustom ? 
                        (<li className='transparent li mb' key={exercise.id}>
                            <div className='transparent li title-color'>
                                <IconPoint
                                    size={25}
                                    stroke={1}
                                    className='list-bullet'
                                />
                                {exercise.exercise}
                            </div>
                            <div className='flex'>
                                <button className='list-btn' onClick={() => toggleEditClick(exercise)}>
                                    <IconEdit
                                        size={20}
                                        stroke={1.5}
                                    />
                                </button>
                                <button className='list-btn delete' onClick={() => handleDeleteExercise(exercise)}>
                                    <IconTrash
                                        size={20}
                                        stroke={1.5}
                                        className='transparent'
                                    />
                                </button>
                            </div>
                        </li>
                        )
                        : 
                        (<li className='transparent li mb' key={exercise.id}>
                            <div className='transparent li title-color'>
                                <IconPoint
                                    size={25}
                                    stroke={1.5}
                                    className='list-bullet'
                                />
                                {t(`exercises.${exercise.exerciseKey}`)}
                            </div>
                            
                            <div className='flex transparent'>
                                <button className='list-btn' onClick={() => toggleEditClick(exercise)}>
                                    <IconEdit
                                        size={20}
                                        stroke={1.5}
                                    />
                                </button>
                                <button className='list-btn delete' onClick={() => handleDeleteExercise(exercise)}>
                                    <IconTrash
                                        size={20}
                                        stroke={1.5}
                                        className='transparent'
                                    />
                                </button>
                            </div>
                        </li>))
                    ))}
                </ul>
                
            ))}
            
        </div>

        {/* modal for editing the exercise */}

        {isEditOpen && (
            <div className='edit-modal glass-dark card-fx transparent'>

                <div className='modal-content transparent '>
                    <div className='modal-header transparent'>
                        <h3 className='transparent h3'>Edit Exercise</h3>
                        <button className='close-modal-btn' onClick={ closeEditModal }>
                            <XMarkIcon className='transparent icon-md close-modal-btn' />
                        </button>
                    </div>
                    <form className='modal-form transparent' onSubmit={handleEditSubmit}>
                        <label className='transparent' htmlFor='exercise-name'>Exercise Name:</label>
                        <input type='text' className='transparent' id='exercise-name' value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
                        <button type='submit' className='transparent'>
                            Save Changes
                        </button>
                        {/* Add your edit form fields here */}
                    </form>
                </div>

            </div>
        )}
    </div>
  )
}

export default ExerciseEditPage
