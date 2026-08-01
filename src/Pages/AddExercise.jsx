import React, { useState } from 'react'
import { db } from "../db/db.js";
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'
import { createExerciseKey } from '../helpers/createExerciseKey.jsx'

const AddExercise = () => {

const { t } = useTranslation();
//const [type, setType] = useState("")
const [isSaving, setIsSaving] = useState(false);
const [saved, setSaved] = useState(false);
const [category, setCategory] = useState("")
const [isMuscle, setIsMuscle] = useState("")
const [exerciseName, setExerciseName] = useState("")
const navigate = useNavigate();
const type = category === "cardio" ? "cardio" : "strength";
const [error, setError] = useState("");

const muscles = {
  upper: ['chest', 'back', 'shoulders', 'arms', 'core'],
  lower: ['quads', 'hamstrings', 'glutes', 'calves']
}

const handleAddExercise = async () => {

  if (!exerciseName || isSaving) return;
  setIsSaving(true);
  setError("");
  // 1. Create exercise
  try{
    const exerciseId = await db.exercises.add({
      exerciseKey: createExerciseKey(exerciseName),
      exercise: exerciseName.trim(),
      type: type.trim().toLowerCase(),
      isCustom: true
    });
    if (type === "strength" && isMuscle){
        const muscle = await db.muscles.get({ muscle: isMuscle });
        if (muscle) {
          await db.exerciseMuscles.add({
            exercise_id: exerciseId,
            muscle_id: muscle.id
          });
      }
    }
    setExerciseName("");
    setIsMuscle("");
    setSaved(true);
    setIsSaving(false);
  
    setTimeout(() => {
      setSaved(false);
      setIsMuscle("");
      navigate("/");
  }, 1500);

  

}

  // 2. If muscle-based, link it
  // reset UI

  catch(err){
    if (err.name === "ConstraintError") {
      setError("Exercise already exists");
    } else {
      setError("Something went wrong");
    }
  } finally {
    setIsSaving(false);
  }
  
};



  return (
    <div className='p-2 transparent'>
        <div className='backBtn-and-title transparent'>
          <BackButton/>
          <h2 className='breadCrumb transparent'>{t('addExercise')}</h2>
        </div>
        <select name="Category" id="" className='selectStyle mt' onChange={ (e) => {setCategory(e.target.value), setIsMuscle(null), setExerciseName("")}}>
            <option value="">{t('selectCategory')}</option>
            <option value="upper">{t('keywords.upperbody')}</option>
            <option value="lower">{t('keywords.lowerbody')}</option>
            <option value="cardio">{t('keywords.cardio')}</option>
        </select>
        
        {category === "upper" && (
          <select
            className='selectStyle'
            onChange={(e) => {
              setIsMuscle(e.target.value)
              setExerciseName("")
            }}
          >
            <option value="">{t('selectMuscle')}</option>
            {muscles.upper.map((muscle) => (
              <option key={muscle} value={muscle}>
                {t(`keywords.${muscle}`)}
              </option>
            ))}
          </select>
        )}
        {category === "lower" && (
          <select
            className='selectStyle'
            onChange={(e) => {
              setIsMuscle(e.target.value)
              setExerciseName("")
            }}
          >
            <option value="">{t('selectMuscle')}</option>
            {muscles.lower.map((muscle) => (
              <option key={muscle} value={muscle}>
                {t(`keywords.${muscle}`)}
              </option>
            ))}
          </select>
        )}

        {category === "cardio" && (
          <div className='flex-col transparent'>
            <label htmlFor="">{t('exerciseName')}:</label>
            <input 
              className='input' 
              type="text" 
              placeholder={t('exerciseName')} 
              value={exerciseName} 
              onChange={(e)=>setExerciseName(e.target.value)}/>

            <button className='add-btn mb3 mt' disabled={!exerciseName} onClick={handleAddExercise}>{t('add')}</button>
          </div>
        )}

        {isMuscle && (
          <div className='flex-col transparent'>
            <label className='transparent label' htmlFor="">{t('exerciseName')}:</label>
            <input 
              className='input' 
              type="text" 
              placeholder={t('exerciseName')} 
              value={exerciseName} 
              onChange={(e)=>setExerciseName(e.target.value)}/>

            <button 
              className='add-btn mb3 mt' 
              disabled={isSaving || !exerciseName} 
              onClick={handleAddExercise}
              >{isSaving? t("saving"): saved? t("saved"): t("add")}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}

        <small className='text-center transparent exerciseListText'>OR</small>

        <div className='start-card card-fx text-div mt3'>
          <h3 className='text-div exerciseListText'>Not sure what exercise to add?</h3>
          <p className='text-div exerciseListText'>Press the button below to see a generic exercise list which you can add</p>
          <Link to="genericList" className='exerciseListBtn' >Exercise List </Link>
        </div>
        
    </div>
  )
}

export default AddExercise