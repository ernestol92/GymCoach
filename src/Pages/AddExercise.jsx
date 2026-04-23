import React, { useState } from 'react'
import { db } from "../db/db.js";
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useTranslation } from 'react-i18next'


const AddExercise = () => {
  const { t } = useTranslation();
  //const [type, setType] = useState("")
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [category, setCategory] = useState("")
  const [isMuscle, setIsMuscle] = useState("")
  const [exerciseName, setExerciseName] = useState("")
  const navigate = useNavigate();
  const muscles = {
    upper: [t('keywords.chest'), t('keywords.back'), t('keywords.shoulders'), t('keywords.arms'), t('keywords.core')],
    lower: [t('keywords.quads'), t('keywords.hamstrings'), t('keywords.glutes'), t('keywords.calves')]
  }
  const type = category === "cardio" ? "cardio" : "strength";
  const [error, setError] = useState("");

const handleAddExercise = async () => {
  
  if (!exerciseName || isSaving) return;

  // 1. Create exercise
  try{
    const exerciseId = await db.exercises.add({
      exercise: exerciseName.trim().toLowerCase(),
      type: type.trim().toLowerCase()
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
    //setIsMuscle("");
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
    <div className='p-2'>
        <div className='backBtn-and-title'>
          <BackButton/>
          <h2 className='breadCrumb'>{t('addExercise')}</h2>
        </div>
        <select name="Category" id="" className='selectStyle mt' onChange={ (e) => {setCategory(e.target.value), setIsMuscle(null), setExerciseName("")}}>
            <option value="">{t('selectCategory')}</option>
            <option value="upper">{t('keywords.upperbody')}</option>
            <option value="lower">{t('keywords.lowerbody')}</option>
            <option value="cardio">{t('keywords.cardio')}</option>
        </select>
        


        {category === "upper" && (
          <select name="Category" id="" className='selectStyle' onChange={(e) => {setIsMuscle(e.target.value), setExerciseName("")}}>
            <option value="">{t('selectMuscle')}</option>
            {muscles.upper.map(muscle => (
              <option key={muscle.toLowerCase()} value={muscle.toLowerCase()}>{muscle}</option>
            ))}
        </select>
        )}
        
        {category === "lower" && (
          <select name="Category" id="" className='selectStyle' onChange={(e) => {setIsMuscle(e.target.value), setExerciseName("")}}>
            <option value="">{t('selectMuscle')}</option>
            {muscles.lower.map(muscle => (
              <option key={muscle.toLowerCase()} value={muscle.toLowerCase()}>{muscle}</option>
            ))}
        </select>
        )}

        {category === "cardio" && (
          <div className='flex-col'>
            <label htmlFor="">{t('exerciseName')}:</label>
            <input 
              className='input' 
              type="text" 
              placeholder={t('exerciseName')} 
              value={exerciseName} 
              onChange={(e)=>setExerciseName(e.target.value)}/>

            <button className='add-btn' disabled={!exerciseName} onClick={handleAddExercise}>{t('add')}</button>
          </div>
        )}

        {isMuscle && (
          <div className='flex-col'>
            <label htmlFor="">{t('exerciseName')}:</label>
            <input 
              className='input' 
              type="text" 
              placeholder={t('exerciseName')} 
              value={exerciseName} 
              onChange={(e)=>setExerciseName(e.target.value)}/>

            <button 
              className='add-btn' 
              disabled={isSaving || !exerciseName} 
              onClick={handleAddExercise}
              >{isSaving? t("saving"): saved? t("saved"): t("add")}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}


        
    </div>
  )
}

export default AddExercise