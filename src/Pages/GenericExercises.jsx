import React from 'react'
import defaultExercises from "../locales/defaultExercises.json";
import { useTranslation } from "react-i18next";
import { seedDefaultExercises } from "../db/seedDefaultExercises"
import { IconPoint } from "@tabler/icons-react";

const GenericExercises = () => {
    const handleSeedExercises = async () => {
        await seedDefaultExercises();
        alert("Default exercises added!");
    };

    const { t } = useTranslation();

  return (
    <div className='p-2 transparent'>
        <div className='transparent glass-dark p-2 card-fx'>

            {defaultExercises.map((item)=>{

                if(item.muscleKey){
                    return <h2 
                            key={item.muscleKey}
                            className='mb mt transparent exerciseListText'>
                                {t(`exercises.${item.muscleKey}`)}
                            
                            </h2>
                }

                return (
                    <p key={item.exerciseKey} className='transparent mb align-center exerciseListText'>
                        <IconPoint
                            size={25}
                            stroke={1}
                            className='list-bullet'
                        />
                    {t(`exercises.${item.exerciseKey}`)}
                    </p>
                )
            })
            }

        </div>
        <button onClick={handleSeedExercises} className='exerciseListBtn genericListBtn mt3'>Add default exercises</button>
    </div>
  )
}

export default GenericExercises
