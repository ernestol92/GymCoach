import React from "react";
import { db } from "../db/db";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LastTime = ({ exercise_id, reportSaved }) => {
  const { t } = useTranslation();
  const [lastSession, setLastSession] = useState([]);
  const [exerciseType, setExerciseType] = useState([]);

  useEffect(() => {
    const fetchLastSession = async () => {
      if (!exercise_id) return;

      const latestRow = await db.history
        .where("exercise_id")
        .equals(exercise_id)
        .reverse()
        .first();

      if (!latestRow) {
        setLastSession(null);
        return;
      }
      const getExerciseRow = await db.exercises
        .where("id")
        .equals(exercise_id)
        .first();
      setExerciseType(getExerciseRow.type);

      const sessionRows = await db.history
        .where("session_id")
        .equals(latestRow.session_id)
        .and((row) => row.exercise_id === exercise_id)
        .toArray();

      sessionRows.sort((a, b) => a.id - b.id);

      setLastSession(sessionRows);
    };

    fetchLastSession();
  }, [exercise_id, reportSaved]);

  return (
    <div className="lastTime transparent glass-dark">
      <div className="lastTime-title">
        <div>{t("lastTime.title")}</div>
        <div>
          {lastSession && lastSession.length > 0
            ? new Date(lastSession[0].date).toLocaleDateString()
            : t("lastTime.never")}
        </div>
      </div>

      {/* i need to access the data on last cardioexercise and render below instead of set and reps */}
      <div className="lastTime-summary transparent">
        {lastSession && lastSession.length > 0 ? (
          lastSession.map((set, index) =>
            exerciseType === "strength" ? (
              <div key={index} className="lastTime-set transparent">
                {set.reps} {t("keywords.reps")}, {set.weight}kg
              </div>
            ) : (
              <div key={index} className="lastTime-set transparent">
                {set.distance} {t("keywords.km")}, {set.duration}min
              </div>
            ),
          )
        ) : (
          <div className="lastTime-set">{t("lastTime.noData")}</div>
        )}
      </div>
    </div>
  );
};

export default LastTime;
