import React from 'react'
import { db } from '../db/db'
import { useState, useEffect } from 'react';

const LastTime = ({exercise_id}) => {
    const [lastSession, setLastSession] = useState([])

    useEffect(() => {
        const fetchLastSession = async () => {
            if(!exercise_id) return;

            const latestRow = await db.history
                .where("exercise_id")
                .equals(exercise_id)
                .reverse()
                .first();

            if (!latestRow) {
                setLastSession(null);
                return;
            }

            const sessionRows = await db.history
                .where("session_id")
                .equals(latestRow.session_id)
                .and(row => row.exercise_id === exercise_id)
                .toArray();

            sessionRows.sort((a, b) => a.id - b.id);

            setLastSession(sessionRows);
        };

        fetchLastSession();
    }, [exercise_id]);

  return (
    <>
        <div className="lastTime">

            <div className="lastTime-title">
                <div>Last time</div>
                <div>{lastSession && lastSession.length > 0 ? new Date(lastSession[0].date).toLocaleDateString() : " " + "Never"}</div>
            </div>

            <div className="lastTime-summary">
                    {lastSession && lastSession.length > 0 ? (
                        lastSession.map((set, index) => (
                            <div key={index} className="lastTime-set">
                                {set.reps} reps, {set.weight}kg
                            </div>
                        ))
                    ) : (
                        <div className="lastTime-set">No data</div>
                    )}
            </div>
        </div>
    </>
  )
}

export default LastTime