import defaultExercises from "../locales/defaultExercises.json"
import React from 'react'
import { db } from "./db"

export const seedDefaultExercises = async() => {

    const exercisesOnly = defaultExercises.filter((item) => item.exerciseKey);

    for(var item of exercisesOnly){
        const existingExercise = await db.exercises
            .where("exerciseKey")
            .equals(item.exerciseKey)
            .first();

            if(existingExercise) continue;

            const exerciseId = await db.exercises.add({
                exerciseKey: item.exerciseKey,
                type: item.type,
                isCustom: false
            });

            const muscle = await db.muscles
                .where("muscle")
                .equals(item.muscle)
                .first();

                if(!muscle) continue;

            await db.exerciseMuscles.add({
                exercise_id: exerciseId,
                muscle_id: muscle.id

            })
    }
}


