import React, { useEffect, useMemo, useState } from 'react'
import { db } from '../db/db'
import BackButton from '../Components/BackButton'
import { useTranslation } from 'react-i18next'

const WorkoutHistory = () => {
  const [history, setHistory] = useState([])
  const { t } = useTranslation();
  useEffect(() => {
    const fetchLatestWorkouts = async () => {
      const allRows = await db.history.toArray()
      const allExercises = await db.exercises.toArray()

      const exerciseMap = allExercises.reduce((acc, exercise) => {
        acc[exercise.id] = exercise.exercise
        return acc
      }, {})

      const latestDates = [
        ...new Set(
          allRows
            .map(row => {
              const parsedDate = new Date(row.date)
              return isNaN(parsedDate)
                ? null
                : parsedDate.toISOString().split('T')[0]
            })
            .filter(Boolean)
        )
      ]
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 3)

      const latestWorkoutRows = allRows
        .filter(row => {
          const parsedDate = new Date(row.date)
          if (isNaN(parsedDate)) return false

          const dateKey = parsedDate.toISOString().split('T')[0]
          return latestDates.includes(dateKey)
        })
        .map(row => ({
          ...row,
          exercise_name: exerciseMap[row.exercise_id] || `Exercise #${row.exercise_id}`
        }))

      setHistory(latestWorkoutRows)
    }

    fetchLatestWorkouts()
  }, [])

  const groupedHistory = useMemo(() => {
    const grouped = history.reduce((acc, row) => {
      const parsedDate = new Date(row.date)
      if (isNaN(parsedDate)) return acc

      const dateKey = parsedDate.toISOString().split('T')[0]

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }

      acc[dateKey].push(row)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([date, rows]) => {
        const sortedRows = [...rows].sort((a, b) => {
          const setA = Number(a.sets) || 0
          const setB = Number(b.sets) || 0
          return setA - setB
        })

        return [date, sortedRows]
      })
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
  }, [history])

  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString)
    if (isNaN(parsedDate)) return dateString

    return parsedDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="history-page">
      
      <div className="history-card-wrapper">
        <BackButton className="justify-self-left"/>
        <div className="history-header">
          <h2 className="history-title">{t('workoutReview.title')}</h2>
          <p className="history-subtitle">{t('workoutReview.3latest')}</p>
        </div>

        {groupedHistory.length === 0 ? (
          <div className="exercise-history-card empty-card">
            <p>{t('workoutReview.noData')}</p>
          </div>
        ) : (
          groupedHistory.map(([date, rows]) => (
            <div className="exercise-history-card" key={date}>
              <div className="card-top">
                <div>
                  <h3>{formatDate(date)}</h3>
                  <p className="session-subtext">{rows.length} {t('workoutReview.entries')}</p>
                </div>
              </div>

              <div className="set-table">
                <div className="set-table-head workout-head">
                  <span>{t('workoutReview.exercise')}</span>
                  <span>{t('keywords.set')}</span>
                  <span>{t('workoutReview.totalRepTime')}</span>
                  <span>{t('workoutReview.totalWeightDistance')}</span>
                </div>

                {rows.map((row) => (
                  <div className="set-table-row workout-row" key={row.id}>
                    <span>{row.exercise_name}</span>
                    <span>{row.sets || '-'}</span>
                    <span>
                      {row.reps
                        ? `${row.reps} reps`
                        : row.duration
                        ? `${row.duration} min`
                        : '-'}
                    </span>
                    <span>
                      {row.weight
                        ? `${row.weight} kg`
                        : row.distance
                        ? `${row.distance} km`
                        : '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default WorkoutHistory