import React from 'react'
import defaultExercises from "../locales/defaultExercises.json";
import { useTranslation } from "react-i18next";
import { seedDefaultExercises } from "../db/seedDefaultExercises"

const GenericExercises = () => {
    const handleSeedExercises = async () => {
        await seedDefaultExercises();
        alert("Default exercises added!");
    };

    const { t } = useTranslation();

  return (
    <div className='p-2'>
        <div className='List'>

            {defaultExercises.map((item)=>{

                if(item.muscleKey){
                    return <h2 
                            key={item.muscleKey}
                            className='mb mt'>
                                {t(`exercises.${item.muscleKey}`)}
                            
                            </h2>
                }

                return (
                    <p key={item.exerciseKey}>{"- "} 
                    {t(`exercises.${item.exerciseKey}`)}
                    </p>
                )
            })
            }

        </div>
        <button onClick={handleSeedExercises} className='exerciseListBtn mt3'>Add default exercises</button>
    </div>
  )
}

export default GenericExercises
