import Dexie from "dexie";

export const db = new Dexie("gymApp")
//kom ih[g att ändra versionen]
db.version(4).stores({
    exercises: "++id, &exercise, type",
    muscles: "++id, muscle, muscleRegion",
    exerciseMuscles: "++id, exercise_id, muscle_id",
    history: "++id, session_id, exercise_id, date, sets, reps, weight, duration, distance, [exercise_id+date]"
})

export const seedMuscles = async () => {
  const count = await db.muscles.count();
  if (count > 0) return;

  await db.muscles.bulkAdd([
    { muscle: "chest", muscleRegion: "upper" },
    { muscle: "back", muscleRegion: "upper" },
    { muscle: "shoulders", muscleRegion: "upper" },
    { muscle: "arms", muscleRegion: "upper" },
    { muscle: "core", muscleRegion: "upper" },
    { muscle: "quads", muscleRegion: "lower" },
    { muscle: "hamstrings", muscleRegion: "lower" },
    { muscle: "glutes", muscleRegion: "lower" },
    { muscle: "calves", muscleRegion: "lower" }
  ]);
};

export default seedMuscles