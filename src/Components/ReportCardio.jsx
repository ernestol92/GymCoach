import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { db } from '../db/db';

const ReportCardio = () => {
    const { exercise } = useParams();

        const [distance, setDistance] = useState(0)
        const [duration, setDuration] = useState(0)
        const [intervals, setIntervals] = useState([]);
    
        const handleDecreaseDistance = ()=> {
            setDistance(prev => Math.max(0, prev - 1));
        }
    
        const handleDecreaseDuration = ()=> {
            setDuration(prev => Math.max(0, prev - 1));
        }
    
        const handleIncreaseDistance = ()=> {
            setDistance(prev => prev + 1);
        }
    
        const handleIncreaseDuration = ()=> {
            setDuration(prev => prev + 1);
        }
    
        const commitCurrentInterval = ()=> {
            if (distance <= 0 && duration <= 0) return intervals;
            const newInterval = { distance, duration }
            return [...intervals, newInterval]
        }
        const handleAddInterval = ()=> {
            const newInterval = commitCurrentInterval();
            if (newInterval.length === intervals.length) return;
            setIntervals(newInterval);
            setDistance(0);
            setDuration(0);
        }
    
        const handleSaveReport = async () => {
            const allIntervals = commitCurrentInterval();
            if(allIntervals.length === 0) return;
            const exerciseRow = await db.exercises.where("exercise").equalsIgnoreCase(exercise).first();
            if(!exerciseRow) return console.error("Exercise not found");
            const sessionId = crypto.randomUUID();
            const now = new Date();
    
            const reportEntries = allIntervals.map(interval => ({
                exercise_id: exerciseRow.id,
                session_id: sessionId,
                date: now,
                sets: allIntervals.length,
                reps: null,
                weight: null,
                duration: interval.duration,
                distance: interval.distance,
            }))
    
            await db.history.bulkAdd(reportEntries);
            setIntervals([]);
            setDistance(0);
            setDuration(0);
           
        }
  return (
    <>
        <div className='exerciseList'>
            <h2 className='exerciseName'>{exercise}</h2>
            
            <div className='reportSet'>
                <div className='set mb3'>
                    <h3>Interval</h3>
                </div>
                <p>Distance:</p>
                <input
                    className='slider'
                    type="range"
                    min="0"
                    max="100"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                />
                <div className='btnWrapper'>
                    <button  className='subAddBtn' onClick={handleDecreaseDistance}>-</button>
                    <input
                        className='numberInput'
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="1"
                        value={distance}
                        onChange={(e) => setDistance(parseInt(e.target.value))}
                    />
                    <button className='subAddBtn' onClick={handleIncreaseDistance}>+</button>
                    
                </div>
                <span className='mb3'>km</span>
                {/* ////////////////////////////////////Weight///////////////////////////////////  */}
                <p>Duration:</p>
                <input
                    className='slider'
                    type="range"
                    min="0"
                    max="500"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />
                <div className='btnWrapper'>
                    <button className='subAddBtn' onClick={handleDecreaseDuration}>-</button>
                    <input
                        className='numberInput'
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="1"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                    <button className='subAddBtn' onClick={handleIncreaseDuration}>+</button>
                </div>
                <span className='mb3'>min</span>
                <p> Intervals reported</p>
                {intervals.map((interval, index) => <span className='reportedSets' key={index}>Interval {index + 1}: {interval.distance} km, {interval.duration} min</span>)}
            </div>
            <div className='mb3 reportWrapper'>
                <button className='addSet-btn' onClick={handleAddInterval}>+Interval</button>
                <button className='add-btn' onClick={handleSaveReport}>Save</button>
            </div>
            

        </div>
    </>
  )
}

export default ReportCardio