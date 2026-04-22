import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../db/db'
import BackButton from './BackButton'

const ExtendedExerciseHistory = () => {
  const { exercise } = useParams()

  const [exerciseRow, setExerciseRow] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      if (!exercise) return

      const foundExercise = await db.exercises
        .where('exercise')
        .equalsIgnoreCase(exercise)
        .first()

      setExerciseRow(foundExercise)

      if (!foundExercise) {
        setHistory([])
        return
      }

      const historyRows = await db.history
        .where('exercise_id')
        .equals(foundExercise.id)
        .reverse()
        .sortBy('date')

      setHistory(historyRows.reverse())
    }

    fetchHistory()
  }, [exercise])

  const groupedHistory = useMemo(() => {
    const grouped = history.reduce((acc, row) => {
      const dateValue = row.date
      let dateKey = 'Unknown date'

      if (dateValue instanceof Date) {
        dateKey = dateValue.toISOString().split('T')[0]
      } else if (typeof dateValue === 'string') {
        dateKey = dateValue.split('T')[0]
      }

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }

      acc[dateKey].push(row)
      return acc
    }, {})

    return Object.entries(grouped).reverse()
  }, [history])

  const isStrengthExercise = exerciseRow?.type === 'strength'

  return (
    <div className="history-page">
      <div className="history-card-wrapper">
        <BackButton className="justify-self-left"/>
        <div className="history-header">
          <h2 className="history-title">{exercise}</h2>
        </div>

        {groupedHistory.length === 0 ? (
          <div className="exercise-history-card empty-card">
            <p>No history found for this exercise yet.</p>
          </div>
        ) : (
          groupedHistory.map(([date, rows]) => {
            const totalSets = rows.length
            const bestWeight = Math.max(...rows.map(r => Number(r.weight) || 0))
            const totalReps = rows.reduce((sum, r) => sum + (Number(r.reps) || 0), 0)
            const totalDistance = rows.reduce((sum, r) => sum + (Number(r.distance) || 0), 0)
            const totalDuration = rows.reduce((sum, r) => sum + (Number(r.duration) || 0), 0)

            return (
              <div className="exercise-history-card" key={date}>
                <div className="card-top">
                  <h3>{date}</h3>
                  <span className="session-badge">{totalSets} sets</span>
                </div>

                <div className="history-summary-grid">
                  <div className="summary-box">
                    <span className="summary-label">Best weight</span>
                    <span className="summary-value">{bestWeight || '-'} kg</span>
                  </div>

                  <div className="summary-box">
                    <span className="summary-label">Total reps</span>
                    <span className="summary-value">{totalReps || '-'}</span>
                  </div>

                  {!isStrengthExercise && (
                    <>
                      <div className="summary-box">
                        <span className="summary-label">Duration</span>
                        <span className="summary-value">{totalDuration || '-'} min</span>
                      </div>

                      <div className="summary-box">
                        <span className="summary-label">Distance</span>
                        <span className="summary-value">{totalDistance || '-'} km</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="set-list">
                  {rows.map((row, index) => (
                    <div className="set-row" key={row.id}>
                      <div className="set-index">#{index + 1}</div>

                      <div className="set-metrics">
                        <span>{row.sets ? `Set ${row.sets}` : `Entry ${index + 1}`}</span>
                        {row.reps ? <span>{row.reps} reps</span> : null}
                        {row.weight ? <span>{row.weight} kg</span> : null}
                        {!isStrengthExercise && row.duration ? <span>{row.duration} min</span> : null}
                        {!isStrengthExercise && row.distance ? <span>{row.distance} km</span> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ExtendedExerciseHistory
// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { db } from '../db/db'
// import { useState, useEffect } from 'react';
// import Calendar from './Calendar';


// const ExtendedExerciseHistory = () => {
//     const { exercise } = useParams();

//     const [exerciseRow, setExerciseRow] = useState();
//     const [history, setHistory] = useState([]);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             if (!exercise) return;
//             const exerciseRow = await db.exercises
//                 .where("exercise")
//                 .equals(exercise)
//                 .first();
//             setExerciseRow(exerciseRow);
            
//             const historyRows = await db.history
//                 .where("exercise_id")
//                 .equals(exerciseRow.id)
//                 .toArray();
//             setHistory(historyRows);
//             //remove console logs later
//             console.log("Exercise Row:", exerciseRow);
//             console.log("History Rows:", historyRows);
//             console.log(history);

//         };
//         fetchHistory();
//     }, [exercise]);
  
  
//     return (
//     <>
//         <div className='history-card-wrapper'>
//             <h2>{exercise}</h2>
//             <div className='exercise-history-card'>
//                 <h3>2020-10-14</h3>
//                 <div className='lastTime-summary'>
//                 <p className='lastTime-summary'>{exerciseRow?.type}</p>
//                 </div>
//             </div>
//         </div>
        
//     </>
//   )
// }

// export default ExtendedExerciseHistory