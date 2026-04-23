import React from 'react'
import { db } from '../db/db'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LastTime = ({ exercise_id }) => {
  const { t } = useTranslation()
  const [lastSession, setLastSession] = useState([])

  useEffect(() => {
    const fetchLastSession = async () => {
      if (!exercise_id) return

      const latestRow = await db.history
        .where("exercise_id")
        .equals(exercise_id)
        .reverse()
        .first()

      if (!latestRow) {
        setLastSession(null)
        return
      }

      const sessionRows = await db.history
        .where("session_id")
        .equals(latestRow.session_id)
        .and(row => row.exercise_id === exercise_id)
        .toArray()

      sessionRows.sort((a, b) => a.id - b.id)

      setLastSession(sessionRows)
    }

    fetchLastSession()
  }, [exercise_id])

  return (
    <div className="lastTime">

      <div className="lastTime-title">
        <div>{t("lastTime.title")}</div>
        <div>
          {lastSession && lastSession.length > 0
            ? new Date(lastSession[0].date).toLocaleDateString()
            : t("lastTime.never")}
        </div>
      </div>

      <div className="lastTime-summary">
        {lastSession && lastSession.length > 0 ? (
          lastSession.map((set, index) => (
            <div key={index} className="lastTime-set">
              {set.reps} {t("keywords.reps")}, {set.weight}kg
            </div>
          ))
        ) : (
          <div className="lastTime-set">
            {t("lastTime.noData")}
          </div>
        )}
      </div>

    </div>
  )
}

export default LastTime