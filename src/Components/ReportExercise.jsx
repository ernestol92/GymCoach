import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { db } from '../db/db';
import LastTime from './LastTime';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

const ReportExercise = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { exercise } = useParams();
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [sets, setSets] = useState([]);
    const [exercise_id, setExercise_id] = useState(null);
    const [exerciseName, setExerciseName] = useState("");

    useEffect(() => {
        const fetchExerciseId = async () => {
            const row = await db.exercises
            .where("exerciseKey")
            .equalsIgnoreCase(exercise)
            .first();

            setExercise_id(row?.id ?? null);
            setExerciseName(row?.exercise || t(`exercises.${row?.exerciseKey}`) )
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
        const exerciseRow = await db.exercises.where("exerciseKey").equalsIgnoreCase(exercise).first();
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
        navigate('/');
    }


  return (
    <>
        <div className='start-page-column transparent'>
            
            <div className='transparent'>
                <BackButton/>
                <h2 className='exerciseName breadCrumb'>{exerciseName}</h2>
            </div>

            <div className='exerciseList transparent'>
                <LastTime exercise_id={exercise_id} />
                <div className='reportSet glass-dark'>
                    <div className='set mb '>
                        <h3> {t("keywords.set")} {sets.length + 1}</h3>
                    </div>
                    <p>{t("keywords.reps")}:</p>
                    
                    <div className='btnWrapper mb'>
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
                    <input
                        className='slider mb3'
                        type="range"
                        min="0"
                        max="30"
                        value={reps}
                        onChange={(e) => setReps(Number(e.target.value))}
                    />
                    {/* ////////////////////////////////////Weight///////////////////////////////////  */}
                    <p>{t("keywords.weight")}:</p>
                    
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
                    <span className='mb'>kg</span>
                    <input
                        className='slider mb3'
                        type="range"
                        min="0"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        
                    />
                    <p>{sets.length} {t("reportexercise.setsReported")}</p>
                    {sets.map((set, index) => <span className='reportedSets' key={index}>{t("keywords.set")} {index + 1}: {set.reps} {t("keywords.reps")}, {set.weight}kg</span>)}
                </div>
                <div className='reportWrapper'>
                    <button onClick={handleAddSet} className='addSet-btn'>{t("reportexercise.addSet")}</button>
                    <button onClick={handleSaveReport} className='add-btn'>{t("reportexercise.save")}</button>
                </div>
                

            </div>
        </div>
    </>
  )
}

export default ReportExercise