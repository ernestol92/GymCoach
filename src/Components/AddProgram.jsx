import React, { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import { db } from "../db/db";
import { useTranslation } from "react-i18next";
import { IconPoint, IconEdit, IconTrash } from "@tabler/icons-react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AddProgram = () => {
  const { t } = useTranslation();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      const muscles = await db.muscles.toArray();

      const result = [];

      for (const muscle of muscles) {
        const pivotRows = await db.exerciseMuscles
          .where("muscle_id")
          .equals(muscle.id)
          .toArray();

        const exerciseIds = pivotRows.map((row) => row.exercise_id);

        const exercises = await db.exercises.bulkGet(exerciseIds);
        result.push({
          muscle: muscle.muscle,
          exercises: exercises.filter(Boolean),
        });
      }

      setMuscleGroups(result);
    };

    fetchExercises();
  }, []);

  const handleSelect = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exerciseId)) {
        return prevSelected.filter((id) => id !== exerciseId);
      } else {
        return [...prevSelected, exerciseId];
      }
    });
  };

  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleSaveProgram = async () => {
    if (programName.trim() === "") {
      alert("Please enter a program name.");
      return;
    }
    if (selectedExercises.length === 0) {
      alert("Please select at least one exercise.");
      return;
    }

    const programId = await db.programs.add({
      programName: programName.trim(),
      createdAt: Date.now(),
    });

    await db.programExercises.bulkPut(
      selectedExercises.map((exerciseId, index) => ({
        program_id: programId,
        exercise_id: exerciseId,
        order: index + 1,
      })),
    );

    // Optionally reset form
    setProgramName("");
    setSelectedExercises([]);
    alert("Program saved");
  };

  return (
    <div className="start-page-column transparent relative">
      <div className="transparent">
        <BackButton />
        <h2 className="breadCrumb transparent">
          {t("addAlternatives.createProgram")}
        </h2>
      </div>

      <div className="flex-col transparent mt2 mb2">
        <label className="label" htmlFor="programName">
          {t("addAlternatives.programName")}
        </label>
        <input
          type="text"
          id="programName"
          name="programName"
          placeholder={t("addAlternatives.programName")}
          className="transparent input"
          value={programName}
          onChange={handleProgramNameChange}
        />
      </div>

      <div className="flex mt2 mb2"></div>

      <div className="exercise-edit-list transparent">
        {muscleGroups.map((group) => (
          <ul key={group.muscle} className="transparent">
            <h3 className="transparent mb mt uppercase title-color fw700">
              {t(`keywords.${group.muscle}`)}
            </h3>
            {group.exercises.map((exercise) =>
              exercise.isCustom ? (
                <li className="transparent li mb" key={exercise.id}>
                  <div className="transparent li title-color">
                    <IconPoint size={25} stroke={1} className="list-bullet" />
                    <p className="title-color fw700">{exercise.exercise}</p>
                  </div>
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleSelect(exercise.id)}
                      checked={selectedExercises.includes(exercise.id)}
                    />
                    <p className="transparent li desc-color orderOutput">
                      {selectedExercises.indexOf(exercise.id) + 1}
                    </p>
                  </div>
                </li>
              ) : (
                <li className="transparent li mb" key={exercise.id}>
                  <div className="transparent li title-color">
                    <IconPoint size={25} stroke={1.5} className="list-bullet" />
                    <p className="title-color fw700 ">
                      {t(`exercises.${exercise.exerciseKey}`)}
                    </p>
                  </div>
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleSelect(exercise.id)}
                      checked={selectedExercises.includes(exercise.id)}
                    />
                    <p className="transparent li desc-color orderOutput">
                      {selectedExercises.indexOf(exercise.id) + 1}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        ))}
      </div>

      <div>
        <button
          className="btn mt2 mb2 exerciseListBtn genericListBtn"
          onClick={handleSaveProgram}
        >
          {t("reportexercise.save")}
        </button>
      </div>
    </div>
  );
};

export default AddProgram;
