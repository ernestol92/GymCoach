import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { db } from '../db/db';
import LastTime from './LastTime';
import BackButton from '../Components/BackButton';

const ReportExercise = () => {

    const { exercise } = useParams();
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const [sets, setSets] = useState([]);
    const [exercise_id, setExercise_id] = useState(null)

    useEffect(() => {
        const fetchExerciseId = async () => {
            const row = await db.exercises
            .where("exercise")
            .equalsIgnoreCase(exercise)
            .first();

            console.log("exercise param:", exercise, "row:", row);
            setExercise_id(row?.id ?? null);
        };

        fetchExerciseId();
}, [exercise]);


    const handleDecreaseReps = ()=> {
        setReps(prev => Math.max(0, prev - 1));
    }

    const handleDecreaseWeight = ()=> {
        setWeight(prev => Math.max(0, prev - 1));
    }

    const handleIncreaseReps = ()=> {
        setReps(prev => prev + 1);
    }

    const handleIncreaseWeight = ()=> {
        setWeight(prev => prev + 1);
    }

    const commitCurrentSet = ()=> {
        if (reps <= 0) return sets;
        const newSet = { reps, weight }
        return [...sets, newSet]
    }
    const handleAddSet = ()=> {
        const newSet = commitCurrentSet();
        if (newSet.length === sets.length) return;
        setSets(newSet)
        setReps(0);
        //setWeight(0);
    }

    const handleSaveReport = async () => {
        const allSets = commitCurrentSet();
        if(allSets.length === 0) return;
        const exerciseRow = await db.exercises.where("exercise").equalsIgnoreCase(exercise).first();
        if(!exerciseRow) return console.error("Exercise not found");
        const sessionId = crypto.randomUUID();
        const now = new Date();

        const reportEntries = allSets.map(set => ({
            exercise_id: exerciseRow.id,
            session_id: sessionId,
            date: now,
            sets: allSets.length,
            reps: set.reps,
            weight: set.weight,
            duration: null,
            distance: null,
        }))

        await db.history.bulkAdd(reportEntries);
        setSets([]);
        setReps(0);
        setWeight(0);
       
    }


  return (
    <>
        <div className='start-page-column'>
            
            <div>
                <BackButton/>
                <h2 className='exerciseName breadCrumb'>{exercise}</h2>
            </div>

            <div className='exerciseList'>
                <LastTime exercise_id={exercise_id} />
                <div className='reportSet'>
                    <div className='set mb '>
                        <h3>Set {sets.length + 1}</h3>
                    </div>
                    <p>Reps:</p>
                    <input
                        className='slider'
                        type="range"
                        min="0"
                        max="30"
                        value={reps}
                        onChange={(e) => setReps(Number(e.target.value))}
                    />
                    <div className='btnWrapper mb3'>
                        <button onClick={handleDecreaseReps} className='subAddBtn'>-</button>
                        <input
                            className='numberInput'
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            step="1"
                            value={reps}
                            onChange={(e) => setReps(Number(e.target.value))}
                        />
                        <button onClick={handleIncreaseReps} className='subAddBtn'>+</button>
                    </div>
                    {/* ////////////////////////////////////Weight///////////////////////////////////  */}
                    <p>Weight:</p>
                    <input
                        className='slider'
                        type="range"
                        min="0"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        
                    />
                    <div className='btnWrapper'>
                        <button onClick={handleDecreaseWeight} className='subAddBtn'>-</button>
                        <input
                            className='numberInput'
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            step="1"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                        <button onClick={handleIncreaseWeight} className='subAddBtn'>+</button>
                    </div>
                    <span className='mb3'>kg</span>
                    <p>{sets.length} Sets reported</p>
                    {sets.map((set, index) => <span className='reportedSets' key={index}>Set {index + 1}: {set.reps} reps, {set.weight}kg</span>)}
                </div>
                <div className='reportWrapper'>
                    <button onClick={handleAddSet} className='addSet-btn'>+Set</button>
                    <Link to='/' onClick={handleSaveReport} className='add-btn'>Save</Link>
                </div>
                

            </div>
        </div>
    </>
  )
}

export default ReportExercise